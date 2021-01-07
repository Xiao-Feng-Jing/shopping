package com.action;

import com.service.GoodsService;
import com.vo.Goods;
import com.vo.PageBean;
import com.vo.ResponseBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/07/10:46
 * @Description:
 **/
@Controller
@RequestMapping("/goods")
public class GoodsAction {

    @Autowired
    private GoodsService goodsService;
    @RequestMapping("/addGoods")
    @ResponseBody
    public ResponseBean addGoods(@RequestBody Goods goods) {
        this.goodsService.saveGoods(goods);
        return new ResponseBean(200L,"正确",null);
    }

    @RequestMapping("/page")
    @ResponseBody
    public ResponseBean queryPage(
            @RequestParam(value = "page",defaultValue = "1") Long page,
            @RequestParam(value = "row",defaultValue = "5") Long row,
            @RequestParam(value="search",required = false)  String search,
            @RequestParam(value="saleable",required = false) Integer sale
            )
    {
        PageBean<Goods> pageBean = goodsService.queryPage(page,row,search,sale);
        return new ResponseBean(200L,"ok",pageBean);
    }
}
