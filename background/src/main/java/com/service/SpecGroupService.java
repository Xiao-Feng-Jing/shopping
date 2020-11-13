package com.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mapper.SpecGroupMapper;
import com.pojo.SpecGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecGroupService {

    @Autowired
    private SpecGroupMapper specGroupMapper;

    public SpecGroup findID(int id){

        return specGroupMapper.selectById(id);
    }

    public List<SpecGroup> findCID(QueryWrapper<SpecGroup> queryWrapper) {
        return specGroupMapper.selectList(queryWrapper);
    }

    public int deleteId(SpecGroup specGroup) {
        return specGroupMapper.updateById(specGroup);
    }

    public int updateId(SpecGroup specGroup){
        return specGroupMapper.updateById(specGroup);
    }

    public int maxID(){
        return specGroupMapper.maxID();
    }

    public int add(SpecGroup specGroup){
        return specGroupMapper.insert(specGroup);
    }

}
