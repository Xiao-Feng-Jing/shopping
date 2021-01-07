package com.pojo;


import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;

/**
 * @author zengkan
 */
@TableName(value = "goods_spu")
public class GoodsSpu {

  private String spuId;
  private String goodsName;
  private String title;
  private int cid1;
  private int cid2;
  private int cid3;
  @TableField(value = "goods_isEnabled")
  private int goodsIsEnabled;


  public String getSpuId() {
    return spuId;
  }

  public void setSpuId(String spuId) {
    this.spuId = spuId;
  }


  public String getGoodsName() {
    return goodsName;
  }

  public void setGoodsName(String goodsName) {
    this.goodsName = goodsName;
  }


  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }


  public int getCid1() {
    return cid1;
  }

  public void setCid1(int cid1) {
    this.cid1 = cid1;
  }


  public int getCid2() {
    return cid2;
  }

  public void setCid2(int cid2) {
    this.cid2 = cid2;
  }


  public long getCid3() {
    return cid3;
  }

  public void setCid3(int cid3) {
    this.cid3 = cid3;
  }


  public int getGoodsIsEnabled() {
    return goodsIsEnabled;
  }

  public void setGoodsIsEnabled(int goodsIsEnabled) {
    this.goodsIsEnabled = goodsIsEnabled;
  }

  @Override
  public String toString() {
    return "GoodsSpu(" +
            "spuId=" + getSpuId() +
            ", goodsName=" + getGoodsName() +
            ", title=" + getTitle() +
            ", cid1=" + getCid1() +
            ", cid2=" + getCid2() +
            ", cid3=" + getCid3() +
            ", goodsIsEnabled=" + getGoodsIsEnabled() +
            ")";
  }
}
