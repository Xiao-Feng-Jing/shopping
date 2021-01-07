package com.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mapper.GoodsSkuMapper;
import com.mapper.GoodsSpuMapper;
import com.mapper.SpuDetailMapper;
import com.mapper.WarehouseGoodsMapper;
import com.pojo.GoodsSku;
import com.pojo.GoodsSpu;
import com.pojo.SpuDetail;
import com.pojo.WarehouseGoods;
import com.util.StringUtils;
import com.vo.Goods;
import com.vo.PageBean;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/07/15:46
 * @Description:
 **/
@Service
public class GoodsService {

    @Autowired
    private GoodsSpuMapper goodsSpuMapper;

    @Autowired
    private GoodsSkuMapper goodsSkuMapper;

    @Autowired
    private SpuDetailMapper spuDetailMapper;

    @Autowired
    private WarehouseGoodsMapper warehouseGoodsMapper;
    @Autowired
    private CategoryService categoryService;

    public boolean saveGoods(Goods goods) {
        System.out.println(goods);
        GoodsSpu goodsSpu = goods.getGoodsSpu();
        String[] cids = goods.getCid().split("/");
        goodsSpu.setSpuId(UUID.randomUUID().toString());
        goodsSpu.setCid1(Integer.parseInt(cids[0]));
        goodsSpu.setCid2(Integer.parseInt(cids[1]));
        if (cids.length>2){
            goodsSpu.setCid3(Integer.parseInt(cids[2]));
        }

        /*默认不上架*/
        goodsSpu.setGoodsIsEnabled(0);
        /*保春spu*/
        this.goodsSpuMapper.insert(goodsSpu);

        SpuDetail spuDetail = goods.getSpuDetail();
        spuDetail.setSpuId(goodsSpu.getSpuId());
        /*保存spuDetail*/
        this.spuDetailMapper.insert(spuDetail);
        /*保持sku和库存*/
        saveSkuAndStock(goods.getSkus(),goodsSpu.getSpuId());
        return true;
    }

    private void saveSkuAndStock(List<GoodsSku> skus,String spu_id) {
        for (GoodsSku goodsSku : skus) {
            if (goodsSku.getGoodsIsEnabled()!=1){
                continue;
            }
            goodsSku.setSpuId(spu_id);
            goodsSku.setSkuId(UUID.randomUUID().toString());
            String indexs = goodsSku.getIndexes().substring(0,goodsSku.getIndexes().length() - 1);
            goodsSku.setIndexes(indexs);
            /*保存sku*/
            this.goodsSkuMapper.insert(goodsSku);
            WarehouseGoods warehouseGoods = new WarehouseGoods();
            warehouseGoods.setSkuId(goodsSku.getSkuId());
            warehouseGoods.setCurrentCnt(goodsSku.getStock());
            /*保存库存信息*/
            this.warehouseGoodsMapper.insert(warehouseGoods);
        }
    }

    public PageBean<Goods> queryPage(Long page, Long row, String search, Integer sale) {
        QueryWrapper<GoodsSpu> wrapper = new QueryWrapper<>();
        if (search!=null){
            wrapper.like("goods_name",search+"%");
        }
        if (sale != null) {
            wrapper.eq("goods_isEnabled",sale);
        }
        Page<GoodsSpu> goodsSpuPage = new Page<GoodsSpu>(page,row);

        IPage<GoodsSpu> itemPage =
                goodsSpuMapper.selectPage(goodsSpuPage,wrapper);
        List<Goods> goodsSpuList = itemPage.getRecords().stream().map(goodsSpu -> {
            Goods goods = new Goods();
            goods.setGoodsSpu(goodsSpu);
            List<String> list = this.categoryService.queryNameById(Arrays.asList(goodsSpu.getCid1(),
                    goodsSpu.getCid2(),goodsSpu.getCid3()));
            goods.setCid(StringUtils.join(list, "/"));


            return goods;
        }).collect(Collectors.toList());
        return new PageBean(itemPage.getTotal(), itemPage.getSize(),itemPage.getCurrent(),itemPage.getPages(),goodsSpuList);
    }
}
