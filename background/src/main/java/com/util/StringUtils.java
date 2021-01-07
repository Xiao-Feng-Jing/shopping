package com.util;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/08/4:25
 * @Description:
 **/
public class StringUtils<T> {
    private List<T> list;

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }
    public static<T> String join(List<T> list,String s){
        String str = "";
        for (T t : list) {
            str = str+t+s;
        }
        str=str.substring(0,str.length() - 1);
        return str;
    }
}
