package com.pojo;

/**
 * Created with IntelliJ IDEA.
 *
 * @author zengkan
 * @Date: 2021/01/04/14:01
 * @Description:
 **/
public class Image {
    private String imageUrl;

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Image(imageUrl=" + getImageUrl() +")";
    }
}
