<template>
  <div class="page bg-light">
    <div class="page-top row bg-primary">
      <div class="col-2 pl-0">
        <a href="javascript:history.go(-1)" class="pl-3 d-block">
          <span class="fas fa-chevron-left text-white"></span>
        </a>
      </div>
      <div class="text-center col-8">订单列表</div>
    </div>

    <div class="row pt-3 bg-white">
      <div class="col-1 pr-0">
        <small class="text-muted">
          <i class="fas fa-map-marker-alt"></i>
        </small>
      </div>
      <div class="col-9">
        <span class>姓名 130000000000</span>
        <div class="text-truncate">
          <small>广东省深圳市南山区</small>
        </div>
      </div>
      <div class="col-2 pr-0 text-right">
        <router-link to="/user/address" class="pr-3 d-block text-muted">
          <i class="fas fa-chevron-right"></i>
        </router-link>
      </div>

      <div class="col-12">
        <div class="pb-3"></div>
      </div>
    </div>

    <div class="mt-2 bg-white">
      <!-- <div class="row pt-3">
        <div class="col-9">
          <span>订单号:</span>
          <small class="text-muted">102020409329588</small>
        </div>
        <div class="col-3 text-right">
          <small class="text-primary">待支付</small>
        </div>
      </div>
      <hr>-->
      <div class="row pt-3 pb-3">
        <div class="col-3">
          <img src alt width="100%" height="100">
        </div>
        <div class="col-9">
          <div class>产品详情产品详情产品详情产品详情产品详情产品详情</div>
          <div class="row mt-3">
            <div class="col-8 text-danger pl-0">10000.00</div>
            <div class="col-4 text-right pr-0">
              <span class="badge badge-dark">10</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row pb-3">
        <div class="col-3">
          <img src alt width="100%" height="100">
        </div>
        <div class="col-9">
          <div class>产品详情产品详情产品详情产品详情产品详情产品详情</div>
          <div class="row mt-3">
            <div class="col-8 text-danger pl-0">10000.00</div>
            <div class="col-4 text-right pr-0">
              <span class="badge badge-dark">10</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row pt-3 pb-3">
        <div class="col-6">运费</div>
        <div class="col-6 text-right">600.00</div>
      </div>
      <div class="row pt-3 pb-3">
        <div class="col-6">总计</div>
        <div class="col-6 text-right text-danger">600.00</div>
      </div>
      <!-- <hr>
      <div class="text-right pr-3 pb-3">
        <span>共2件商品,</span>
        <span>合计:10000</span>
      </div>-->
      <!-- <div class="row pb-3">
        <div class="col-8">
          <small class="text-muted">下单时间:2018/12/24 15:30</small>
        </div>
        <div class="col-4 text-right">
          <a href class="btn btn-sm btn-outline-primary btn-block">操作</a>
        </div>
      </div>-->
    </div>

    <div class="row mt-2 bg-white pt-3 pb-3 border-bottom">
      <div class="col-6">支付方式</div>
      <div class="col-6 text-right">
        <span class="text-muted">积分支付</span>
      </div>
    </div>
    <div class="row mt-2 bg-white pt-3 pb-3">
      <div class="col-2">备注</div>
      <div class="col-10 text-right">
        <span class="text-muted">
          <textarea cols="3" class="form-control bg-light"></textarea>
        </span>
      </div>
    </div>

    <div class="row pt-5 pb-5 bg-white">
      <div class="col-12">
        <a href="javascript:;" class="btn btn-primary btn-lg btn-radius-big btn-block">确定</a>
      </div>
    </div>
    <div class="p-5"></div>
  </div>
</template>

<script>
export default {};
</script>

