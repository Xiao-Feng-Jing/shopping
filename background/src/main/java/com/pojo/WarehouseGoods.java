package com.pojo;


import com.baomidou.mybatisplus.annotation.TableField;

/**
 * @author zengkan
 */
public class WarehouseGoods {

  private String skuId;
  private long currentCnt;
  @TableField("in_transit_cnt")
  private long inTransitCnt;


  public String getSkuId() {
    return skuId;
  }

  public void setSkuId(String skuId) {
    this.skuId = skuId;
  }


  public long getCurrentCnt() {
    return currentCnt;
  }

  public void setCurrentCnt(long currentCnt) {
    this.currentCnt = currentCnt;
  }


  public long getInTransitCnt() {
    return inTransitCnt;
  }

  public void setInTransitCnt(long inTransitCnt) {
    this.inTransitCnt = inTransitCnt;
  }

  @Override
  public String toString() {
    return "WarehouseGoods(" +
            "skuId=" + getSkuId() +
            ", currentCnt=" + getCurrentCnt() +
            ", inTransitCnt=" + getInTransitCnt() +
            ")";
  }
}
