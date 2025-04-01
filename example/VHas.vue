<template>
  <div class="box move" v-move>
    移动
  </div>
  <div class="box">
    <!-- 拖到move会让整个box一起移动 -->
    <div class="top move" v-move.moveParent>移动</div>
  </div>
</template>

<script setup lang='ts'>
import { moveDirective } from 'lite-move';
// 注册局部指令
const vMove = moveDirective;
</script>

<script lang="ts">

/* 选项模式
import { moveDirective } from 'lite-move';
export default {
  directives: {
    // 在模板中启用 v-move
    move: moveDirective
  }
}
 */
</script>

<style scoped lang='scss'>
.move {
  cursor: move;
}

.box {
  width: 100px;
  height: 100px;
  border: brown 3px solid;
  background-color: green;
}

.top {
  width: 100%;
  height: 30px;
  background-color: bisque;
}
</style>