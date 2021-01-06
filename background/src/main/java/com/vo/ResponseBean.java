package com.vo;

/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/04/0:50
 * @Description:
 **/
public class ResponseBean {
    private long code;

    private String msg;

    private String enCode;

    private Object data;

    public void setCode(long code) {
        this.code = code;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public void setEnCode(String enCode) {
        this.enCode = enCode;
    }

    public void setData(Object data) {
        this.data = data;
    }

    protected boolean canEqual(Object other) {
        return other instanceof com.vo.ResponseBean;
    }

    @Override
    public String toString() {
        return "ResponseBean(code=" + getCode() + ", msg=" + getMsg() + ", enCode=" + getEnCode() + ", data=" + getData() + ")";
    }

    public long getCode() {
        return this.code;
    }

    public String getMsg() {
        return this.msg;
    }

    public String getEnCode() {
        return this.enCode;
    }

    public Object getData() {
        return this.data;
    }

    public ResponseBean() {}

    public ResponseBean(long code, String msg, String enCode, Object data) {
        this.code = code;
        this.msg = msg;
        this.enCode = enCode;
        this.data = data;
    }

    public ResponseBean(long code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
