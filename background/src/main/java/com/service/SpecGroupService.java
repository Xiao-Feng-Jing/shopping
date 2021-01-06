package com.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mapper.SpecGroupMapper;
import com.pojo.SpecGroup;
import com.pojo.SpecParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @author zengkan
 */
@Service
public class SpecGroupService {

    @Autowired
    private SpecGroupMapper specGroupMapper;
    @Autowired
    private SpecParamService specParamService;

    public SpecGroup findId(int id){

        return specGroupMapper.selectById(id);
    }
    public List<SpecGroup> findIdList(String id){
        String[] cids =id.split("/");
        Set<Object> cidSet = new HashSet<Object>();
        cidSet.addAll(Arrays.asList(cids));
        List<SpecGroup> specGroups =  specGroupMapper.specCategory(cidSet);
        System.out.println(specGroups);
        return specGroups;
    }

    public List<SpecGroup> findCID(int cid) {
        return specGroupMapper.findCID(Collections.singleton(cid));
    }

    public int deleteId(int id) {
        int n = specGroupMapper.deleteById(id);
        if (n != 0) {
            specParamService.deleteGroupById(id);
        }
        return n;
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

    public Integer selectName(QueryWrapper<SpecGroup> queryWrapper) {
        return specGroupMapper.selectCount(queryWrapper);
    }

    public int updateName(String name, int cid) {
        return specGroupMapper.updateName(name,cid);
    }


}
