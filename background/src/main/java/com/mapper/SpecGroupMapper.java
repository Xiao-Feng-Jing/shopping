package com.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pojo.SpecGroup;

public interface SpecGroupMapper extends BaseMapper<SpecGroup> {
    int maxID();
}
