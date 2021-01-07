package com.pojo;


import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

import java.math.BigDecimal;

/**
 * @author zengkan
 */
@TableName("goods_sku")
public class GoodsSku {

  private String skuId;
  private String spuId;
  private BigDecimal goodsPrice;
  @TableField("goods_sale_price")
  private BigDecimal goodsSalePrice;
  @TableField("goods_isEnabled")
  private int goodsIsEnabled;
  private String indexes;
  private String ownSpec;
  @TableField(exist = false)
  private long stock;


  public long getStock() {
    return stock;
  }

  public void setStock(long stock) {
    this.stock = stock;
  }

  public String getSkuId() {
    return skuId;
  }

  public void setSkuId(String skuId) {
    this.skuId = skuId;
  }


  public String getSpuId() {
    return spuId;
  }

  public void setSpuId(String spuId) {
    this.spuId = spuId;
  }


  public BigDecimal getGoodsPrice() {
    return goodsPrice;
  }

  public void setGoodsPrice(BigDecimal goodsPrice) {
    this.goodsPrice = goodsPrice;
  }


  public BigDecimal getGoodsSalePrice() {
    return goodsSalePrice;
  }

  public void setGoodsSalePrice(BigDecimal goodsSalePrice) {
    this.goodsSalePrice = goodsSalePrice;
  }


  public int getGoodsIsEnabled() {
    return goodsIsEnabled;
  }

  public void setGoodsIsEnabled(int goodsIsEnabled) {
    this.goodsIsEnabled = goodsIsEnabled;
  }


  public String getIndexes() {
    return indexes;
  }

  public void setIndexes(String indexes) {
    this.indexes = indexes;
  }


  public String getOwnSpec() {
    return ownSpec;
  }

  public void setOwnSpec(String ownSpec) {
    this.ownSpec = ownSpec;
  }

  @Override
  public String toString() {
    return "GoodsSku(" +
            "skuId=" + getSkuId()+
            ", spuId=" + getSpuId()+
            ", goodsPrice=" + getGoodsPrice() +
            ", goodsSalePrice=" + getGoodsSalePrice() +
            ", goodsIsEnabled=" + getGoodsIsEnabled() +
            ", indexes=" + getIndexes() +
            ", ownSpec=" + getOwnSpec()+
            ", stock="+getStock()+
            ")";
  }
}
