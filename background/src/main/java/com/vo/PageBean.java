package com.vo;

import java.io.Serializable;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/08/3:33
 * @Description:
 **/
public class PageBean<T> implements Serializable {

    private static final long serialVersionUID = -908900789657L;

    private long total;
    private long pageSize;
    private String rowSize;
    private long pageNum;
    private long pages;
    private List<T> list;

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getPageSize() {
        return pageSize;
    }

    public void setPageSize(long pageSize) {
        this.pageSize = pageSize;
    }

    public String getRowSize() {
        return rowSize;
    }

    public void setRowSize(String rowSize) {
        this.rowSize = rowSize;
    }

    public long getPageNum() {
        return pageNum;
    }

    public void setPageNum(long pageNum) {
        this.pageNum = pageNum;
    }

    public long getPages() {
        return pages;
    }

    public void setPages(long pages) {
        this.pages = pages;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public PageBean(long total, long pageSize, long pageNum, long pages,List<T> list) {
        this.total = total;
        this.pageSize = pageSize;
        this.pageNum = pageNum;
        this.pages = pages;
        this.rowSize=(pageNum-1)*pageSize+1+"-";
        if (pageSize*pageNum>total){
            this.rowSize+=total;
        }else {
            this.rowSize += pageSize*pageNum;
        }
        this.list = list;
    }

    @Override
    public String toString() {
        return "PageBean(" +
                "total=" + total +
                ", pageSize=" + pageSize +
                ", rowSize=" + rowSize +
                ", pageNum=" + pageNum +
                ", pages=" + pages +
                ", list=" + list +
                ')';
    }
}
