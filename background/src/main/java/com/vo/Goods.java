package com.vo;

import com.pojo.GoodsSku;
import com.pojo.GoodsSpu;
import com.pojo.SpuDetail;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/07/11:23
 * @Description:
 **/
public class Goods {
    private String cid;
    private String goodsName;
    private GoodsSpu goodsSpu;
    private List<GoodsSku> skus;
    private SpuDetail spuDetail;

    public SpuDetail getSpuDetail() {
        return spuDetail;
    }

    public void setSpuDetail(SpuDetail spuDetail) {
        this.spuDetail = spuDetail;
    }

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public GoodsSpu getGoodsSpu() {
        return goodsSpu;
    }

    public void setGoodsSpu(GoodsSpu goodsSpu) {
        this.goodsSpu = goodsSpu;
    }

    public List<GoodsSku> getSkus() {
        return skus;
    }

    public void setSkus(List<GoodsSku> skus) {
        this.skus = skus;
    }

    @Override
    public String toString() {
        return "Goods(" +
                "cid=" + getCid() +
                ", goodsSpu=" + getGoodsSpu() +
                ", Skus=" + getSkus() +
                ", spuDetail=" + getSpuDetail() +
                ")";
    }
}
