package com.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.util.List;

/**
 * @author zengkan
 */
@TableName(resultMap = "spec")
public class SpecGroup {

  @TableId(value = "id", type = IdType.AUTO)
  private long id;
  private long cid;
  private String name;
  private long status;
  @TableField(exist = false)
  private List<SpecParam> ParamsList;

  public List<SpecParam> getParamsList() {
    return ParamsList;
  }

  public void setParamsList(List<SpecParam> paramsList) {
    ParamsList = paramsList;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public long getCid() {
    return cid;
  }

  public void setCid(long cid) {
    this.cid = cid;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public long getStatus() {
    return status;
  }

  public void setStatus(long status) {
    this.status = status;
  }

  @Override
  public String toString() {
    return "SpecGroup(id=" + getId() +", cid=" + getCid() +", name='" + getName() + ", status=" + getStatus() +",specParams="+getParamsList()+")";
  }
}
