package com.pojo;


import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author zengkan
 */
@TableName(value = "goods_category")
public class GoodsCategory {

  @TableId( value = "category_id")
  private int categoryId;
  @TableField(value = "category_name")
  private String categoryName;
  @TableField(value = "parent_id")
  private int parentId;
  @TableField(value = "category_level")
  private int categoryLevel;
  @TableField(exist = false)
  private List<GoodsCategory> categorySet = new ArrayList<GoodsCategory>();

  public List<GoodsCategory> getCategorySet() {
    return categorySet;
  }

  public void setCategorySet(List<GoodsCategory> categorySet) {
    this.categorySet = categorySet;
  }

  public int getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(int categoryId) {
    this.categoryId = categoryId;
  }

  public String getCategoryName() {
    return categoryName;
  }

  public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
  }

  public int getParentId() {
    return parentId;
  }

  public void setParentId(int parentId) {
    this.parentId = parentId;
  }

  public int getCategoryLevel() {
    return categoryLevel;
  }

  public void setCategoryLevel(int categoryLevel) {
    this.categoryLevel = categoryLevel;
  }

}
