package com.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mapper.SpecParamMapper;
import com.pojo.SpecParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecParamService {

    @Autowired
    private SpecParamMapper specParamMapper;

    public List<SpecParam> find(QueryWrapper queryWrapper){
        return specParamMapper.selectList(queryWrapper);
    }
}
