package com.action;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pojo.SpecGroup;
import com.pojo.SpecParam;
import com.service.SpecGroupService;
import com.service.SpecParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
@RequestMapping(value = "/spec.do")
public class SpecAction {

    @Autowired
    private HttpServletRequest request;
    @Autowired
    private SpecGroupService specGroupService;
    @Autowired
    private SpecParamService specParamService;

    @ResponseBody
    @RequestMapping(params = "p=findSpec")
    public String findID(){
        int cid = Integer.parseInt(request.getParameter("cid"));
        QueryWrapper<SpecGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid",cid)
                .eq("status",1);
        List<SpecGroup> list = specGroupService.findCID(queryWrapper);
        String string = JSON.toJSONString(list);
        return string;
    }

    @ResponseBody
    @RequestMapping(params = "p=specGroupDelete")
    public String deleteId(){
        int id = Integer.parseInt(request.getParameter("id"));
        SpecGroup specGroup = specGroupService.findID(id);
        specGroup.setStatus(0);
        int n = specGroupService.deleteId(specGroup);
        return n+"";
    }

    @ResponseBody
    @RequestMapping(params = "p=addSpecGroup")
    public String addSpec(){
        String name = request.getParameter("name");
        int id = specGroupService.maxID()+1;
        int cid = Integer.parseInt(request.getParameter("cid"));
        SpecGroup specGroup = new SpecGroup();
        specGroup.setId(id);
        specGroup.setName(name);
        specGroup.setCid(cid);
        specGroup.setStatus(1);
        int n = specGroupService.add(specGroup);
        return n+"";
    }

    @ResponseBody
    @RequestMapping(params = "p=updateSpecGroup")
    public String updateSpec(){
        String name = request.getParameter("name");
        int id = Integer.parseInt(request.getParameter("id"));
        SpecGroup specGroup = specGroupService.findID(id);
        specGroup.setName(name);
        specGroup.setStatus(1);
        int n = specGroupService.updateId(specGroup);
        return n+"";
    }

    @ResponseBody
    @RequestMapping(params = "p=specParam")
    public String findSpecParam(){
        int cid = Integer.parseInt(request.getParameter("cid"));
        int gid = Integer.parseInt(request.getParameter("gid"));
        QueryWrapper<SpecParam> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("cid",cid)
                .eq("group_id",gid);
        List<SpecParam> list = specParamService.find(queryWrapper);
        String string = JSON.toJSONString(list);
        return string;
    }
}
