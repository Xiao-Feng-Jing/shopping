package com.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.pojo.SpecParam;
import org.apache.ibatis.annotations.Param;

/**
 * @author zengkan
 */
public interface SpecParamMapper extends BaseMapper<SpecParam> {
    int maxID();

    void updateGroup(int id);

    int updateName(@Param("name") String name,@Param("cid") int cid,@Param("gid") int gid);
}
