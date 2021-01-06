package com.action;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.pojo.GoodsCategory;
import com.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zengkan
 *
 *
 */
@Controller
@RequestMapping(value = "/main")
public class MainAction {

    @Autowired
    private CategoryService categoryService;

    /**
     * 查询所有分类
     * */
    @ResponseBody
    @RequestMapping("/category")
    public String category(){
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_status",1);
        List<GoodsCategory> list = categoryList(categoryService.findAll(queryWrapper));
        return JSON.toJSONString(list);
    }

    /**根据父分类查询；
     *
     * @return
     */
    @ResponseBody
    @RequestMapping("/categoryParent")
    public String parent(){
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_status",1);
        List<GoodsCategory> list = categoryService.findAll(queryWrapper);
        return JSON.toJSONString(list);
    }

    /**
     * 修改分类信息；
     */
    @ResponseBody
    @RequestMapping("/categoryUpdate")
    public String categoryUpdate(@RequestParam("id") Integer id,
                                 @RequestParam("parent") Integer parent,
                                 @RequestParam("name") String name){
        int level;
        if (parent == null){
            parent = 0;
            level = 1;
        }else {
            level = level(parent);
        }
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_id",id);
        GoodsCategory goodsCategory = new GoodsCategory();
        goodsCategory.setCategoryName(name);
        goodsCategory.setParentId(parent);
        goodsCategory.setCategoryLevel(level);
        int n = categoryService.update(goodsCategory,queryWrapper);
        return n+"";
    }

    /**
     * 添加分类
     * */
    @ResponseBody
    @RequestMapping("/categoryInsert")
    public String categoryInsert(@RequestParam("name") String name, @RequestParam("parent") Integer parent){
        if (name == null||"".equals(name.trim())){
            return 3+"";
        }
        int level;
        if (parent==null||parent==0){
            parent = 0;
            level = 1;
        }else {
            level = level(parent);
        }
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_name",name)
                .eq("parent_id",parent)
                .eq("category_level",level);
        int a = categoryService.selectName(queryWrapper);
        int n ;
        if (a > 0) {
            n = categoryService.updateName(name,parent,level);
        }else {
            int id = categoryService.maxId()+1;
            GoodsCategory goodsCategory = new GoodsCategory();
            goodsCategory.setCategoryId(id);
            goodsCategory.setCategoryName(name);
            goodsCategory.setParentId(parent);
            goodsCategory.setCategoryLevel(level);
            n = categoryService.insert(goodsCategory);
        }

        return n+"";
    }

    /**
     * 修改分类状态
     * */
    @ResponseBody
    @RequestMapping("/categoryDelete")
    public String categoryDelete(@RequestParam Integer id){
        return categoryService.delete(id)+"";
    }

    /**
     * 查询分类名是否存在；
     * */
    @ResponseBody
    @RequestMapping("/selectName")
    public String selectName(HttpServletRequest request){
        String name = request.getParameter("name");
        String id = request.getParameter("id");
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_name",name)
                .eq("category_status",1);

        if (id!=null){
            int cid = Integer.parseInt(id);
            queryWrapper.ne("category_id",cid);
        }
        return categoryService.selectName(queryWrapper)+"";
    }
    /**
     * 查询第一层的分类
     *
     * */
    @ResponseBody
    @RequestMapping("/categoryLevel")
    public String findNameLevel(@RequestParam("level") Integer level,HttpServletRequest request){
        String parentId = request.getParameter("parent");
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_level",level)
                .eq("category_status",1);
        if (parentId != null) {
            queryWrapper.eq("parent_id",parentId);
        }

        List<GoodsCategory> list = categoryService.findlevel(queryWrapper);
        return JSON.toJSONString(list);
    }
    /**
     * 查看分类层级
     * */
    public int level(int parent){
        QueryWrapper<GoodsCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_id",parent);
        GoodsCategory goodsCategory = categoryService.select(queryWrapper);
        return goodsCategory.getCategoryLevel()+1;
    }

    /**
     * 对于分类进行父类与子类分开；
     * */
    private List<GoodsCategory> categoryList(List<GoodsCategory> all){
        List<GoodsCategory> list = new ArrayList<GoodsCategory>();
        Map<Integer,GoodsCategory> map = new HashMap<Integer, GoodsCategory>();
        try {
            for (GoodsCategory category : all) {
                map.put(category.getCategoryId(),category);
            }
            for (GoodsCategory category : all) {
                if (category.getParentId()==0){
                    list.add(category);
                }else {
                    GoodsCategory ps = map.get(category.getParentId());
                    ps.getCategorySet().add(category);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
