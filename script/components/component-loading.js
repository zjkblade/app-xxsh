"use strict";Vue.component("e-loading",{template:'<div>\n        <div v-cloak="" v-if="hasMore"  class="eui-loading">\n            <div class="eui-loading-icon"></div>\n            <div class="eui-loading-text">数据正在加载，请稍候..</div>\n        </div>\n        <div v-cloak="" v-if="!hasMore" class="eui-loading flex-column flex-center">\n            <div v-if="hasData" class="eui-loading-text">没有更多数据了</div>\n            <div v-if="!hasData" class="eui-loading-text">没有查询到数据</div>\n        </div>\n    </div>',props:{hasData:{type:Boolean,default:!0},hasMore:{type:Boolean,default:!0}}});