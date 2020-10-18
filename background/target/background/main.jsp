<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>vivo商城后台管理系统</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/header.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/aside.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/footer.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/main.css">
</head>
<body>
    <div id="ground">
        <%@ include file="header.jsp"%>
        <%@ include file="aside.jsp"%>
        <section class="main"></section>
        <footer id="footer">
            <div>
                <div class="vp-foot-bottom">
                    <p class="vp-foot-copyright">
                        Copyright ©2011-2020广东天宸网络科技有限公司 版权所有 保留一切权利
                        <span class="vp-foot-copyright-line">|</span>
                        <span class="vp-foot-copyright-main">
                        <a href="javascript:void(0);">隐私政策</a> |
                        <a href="javascript:void(0);">法律声明</a> |
                        <a href="javascript:void(0);">营业执照</a> |
                        <a href="javascript:void(0);">粤B2-20080267</a> |
                        <a href="javascript:void(0);">粤ICP备14052990号</a> |
                        <a href="javascript:void(0);" class="vp-foot-policeText">粤公网安备 44190002004246号</a> |
                        <a href="javascript:void(0);" class="vp-foot-country">Select Location</a>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    </div>
</body>
</html>