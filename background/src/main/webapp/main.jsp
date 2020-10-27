<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>vivo商城后台管理系统</title>
    <link rel="stylesheet" type="text/css" href="http://at.alicdn.com/t/font_2053327_3gcz0w6ni24.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/header.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/aside.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/main.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/pop.css"/>
</head>
<body>
<div id="ground">
    <header id="header">
        <div class="top">
            <div class="top-div">
                <p>vivo商城后台管理系统</p>
            </div>
        </div>
    </header>
    <aside id="aside">
        <ul class="aside-links aside-group">
            <li>
                <a href="javascript:void(0);" class="aside-links">商品管理</a>
                <ul class="aside-sub-headers">
                    <li class="aside-sub-header">
                        <a href="javascript:void(0);" class="aside-links">分类管理</a>
                    </li>
                    <li class="aside-sub-header">
                        <a href="javascript:void(0);" class="aside-links">规格参数</a>
                    </li>
                    <li class="aside-sub-header">
                        <a href="javascript:void(0);" class="aside-links">商品列表</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:void(0);" class="aside-links">销售管理</a>
                <ul class="aside-sub-headers">
                    <li class="aside-sub-header">
                        <a href="javascript:void(0);" class="aside-links">进行中的订单</a>
                    </li>
                    <li class="aside-sub-header">
                        <a href="javascript:void(0);" class="aside-links">已完成的订单</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:void(0);" class="aside-links">会员管理</a>
                <ul class="aside-sub-headers">
                    <li class="aside-sub-header">
                        <a href="javascript:void(0);" class="aside-links">用户管理</a>
                    </li>
                </ul>
            </li>
        </ul>
    </aside>
    <section class="main">
        <div class="main-top">
            <a href="javascript:void(0);" id="top-one">商品管理</a>
            <div class="nav-inline">
                <i class="iconfont icon-arrow-right-bold"></i>
                <span id="top-two">分类管理</span>
            </div>
        </div>
        <div class="main-content">
            <div class="">
                <button class="add-button"></button>
            </div>
            <ul>

            </ul>
        </div>
    </section>
</div>
<div id="pop">
    <div class="pop-box">
        <div class="pop-top">
            <span class="top-text">新增分类</span>
            <i class="iconfont icon-guanbi" id="pop-close"></i>
        </div>
        <div class="pop-main">
            <div class="input-box">
                <label for="categoryName">分类名称</label>
                <input type="text" id="categoryName" class="form-text" ><br/>
                <label for="categoryParent">父分类名称</label>
                <select id="categoryParent" class="form-text">
                </select><br/>
            </div>
        </div>
        <div class="pop-bottom">
            <button id="empty-button">清空</button>
            <button id="submit-button">提交</button>
        </div>
    </div>
</div>

</body>
<script src="${pageContext.request.contextPath}/jquery/jquery-3.4.1.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/aside.js" type="text/javascript" ></script>
<script src="${pageContext.request.contextPath}/js/pop.js" type="text/javascript" ></script>

</html>