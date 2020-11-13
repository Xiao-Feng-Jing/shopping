package com.action;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pojo.GoodsCategory;
import com.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequestMapping(value = "/main.do",produces = "application/json; charset=utf-8")
public class MainAction {
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private CategoryService categoryService;

    @ResponseBody
    @RequestMapping(params = "p=category")
    public String category(){
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_status",1);
        List<GoodsCategory> list = categoryList(categoryService.findAll(queryWrapper));
        String string = JSON.toJSONString(list);
        return string;
    }

    @ResponseBody
    @RequestMapping(params = "p=categoryParent")
    public String parent(){
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_status",1);
        List<GoodsCategory> list = categoryService.findAll(queryWrapper);
        String string = JSON.toJSONString(list);
        return string;
    }
    @ResponseBody
    @RequestMapping(params = "p=categoryName")
    public String categoryName(){
        String name = request.getParameter("name");
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_name",name);
        GoodsCategory goodsCategory = categoryService.select(queryWrapper);
        String string = JSON.toJSONString(goodsCategory);
        return string;
    }

    @ResponseBody
    @RequestMapping(params = "p=categoryUpdate")
    public String categoryUpdate(){
        int id = Integer.parseInt(request.getParameter("id"));
        String name = request.getParameter("name");
        int parent;
        int level;
        if (request.getParameter("parent")==""||"".equals(request.getParameter("parent"))){
            parent = 0;
            level = 1;
        }else {
            parent = Integer.parseInt(request.getParameter("parent"));
            level = level(parent);
        }
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_id",id);
        GoodsCategory goodsCategory = new GoodsCategory();
        goodsCategory.setCategoryName(name);
        goodsCategory.setParentId(parent);
        goodsCategory.setCategoryLevel(level);
        int n = categoryService.update(goodsCategory,queryWrapper);
        String string = n+"";
        return string;
    }

    @ResponseBody
    @RequestMapping(params = "p=categoryInsert")
    public String categoryInsert(){
        String name = request.getParameter("name");
        if (name == null||"".equals(name.trim())){
            return 3+"";
        }
        int parent;
        int level;
        if (request.getParameter("parent")==""||"".equals(request.getParameter("parent"))){
            parent = 0;
            level = 1;
        }else {
            parent = Integer.parseInt(request.getParameter("parent"));
            level = level(parent);
        }
        int id = categoryService.maxId()+1;
        System.out.println(parent);
        System.out.println(name);
        GoodsCategory goodsCategory = new GoodsCategory();
        goodsCategory.setCategoryId(id);
        goodsCategory.setCategoryName(name);
        goodsCategory.setParentId(parent);
        goodsCategory.setCategoryLevel(level);
        int n = categoryService.insert(goodsCategory);
        String ss = n+"";
        return ss;
    }

    @ResponseBody
    @RequestMapping(params = "p=categoryDelete")
    public String categoryDelete(){
        int id = Integer.parseInt(request.getParameter("id"));
        int n = categoryService.delete(id);
        return n+"";
    }

    @ResponseBody
    @RequestMapping(params = "p=selectName")
    public String selectName(){
        String name = request.getParameter("name");
        String id = request.getParameter("id");
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_name",name);
        int n=0;

        if (id!=null){
            int cid = Integer.parseInt(id);
            queryWrapper.ne("category_id",cid);
        }
        n = categoryService.selectName(queryWrapper);
        return n+"";
    }

    public int level(int parent){
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_id",parent);
        GoodsCategory goodsCategory = categoryService.select(queryWrapper);
        int level = goodsCategory.getCategoryLevel()+1;
        return level;
    }

    private List<GoodsCategory> categoryList(List<GoodsCategory> all){
        List<GoodsCategory> list = new ArrayList<GoodsCategory>();
        Map<Integer,GoodsCategory> map = new HashMap<Integer, GoodsCategory>();
        try {
            for (GoodsCategory category : all) {
                map.put(category.getCategoryId(),category);
            }
            for (GoodsCategory category : all) {
                GoodsCategory goodsCategory = category;
                if (goodsCategory.getParentId()==0){
                    list.add(goodsCategory);
                }else {
                    GoodsCategory ps = map.get(category.getParentId());
                    ps.getCategorySet().add(goodsCategory);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
