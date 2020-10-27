package com.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pojo.GoodsCategory;

public interface CategoryMapper extends BaseMapper<GoodsCategory>{
    public int maxID();
}
