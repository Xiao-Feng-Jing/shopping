package com.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pojo.SpecGroup;
import org.apache.ibatis.annotations.Param;

/**
 * @author zengkan
 */
public interface SpecGroupMapper extends BaseMapper<SpecGroup> {
    int maxID();

    int updateName(@Param("name") String name,@Param("cid") int cid);
}
