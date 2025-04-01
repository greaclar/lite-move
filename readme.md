# lite-move
一个使用transform实现dom元素拖动的vue指令，对外部环境要求更少，不再依赖position，任何元素都可以高效拖动！

另外，兼容原生js、vue2、vue3！！

# 安装

```shell
npm i lite-move --save
```

# 特点

+ 使用transform来实现元素的移动，性能更好
+ 不依赖position，不会修改top和left等定位属性，更健壮，任何元素都可以拖动
+ 可在原生js、vue2、vue3中使用

# 使用

如果需要将指令注册为全局指令，可通过安装插件来自动注册，该插件自动识别vue版本，会根据环境自动安装对应版本的指令。

```js
import { moveDirectivePlugin } from 'lite-move'
// 安装插件（在vue2中app是Vue构造函数，而在vue3中app是createApp返回的对象）
app.use(moveDirectivePlugin).mount('#app')
```

在vue3、vue2、原生js中使用示例如下：

## vue3

### 注册为全局指令

安装`moveDirectivePlugin`插件，会在全局注册一个`v-move`的指令，添加了v-move指令的元素可自由拖动

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { moveDirectivePlugin } from 'lite-move'

const app = createApp(App);
// 根据环境自动注册为全局指令v-move
app.use(moveDirectivePlugin).mount('#app')

/*
使用：<div v-move> </div>
*/
```

### 注册为局部指令

```html
<template>
  <div class="box move" v-move>
    移动
  </div>
  <div class="box">
    <!-- moveParent修饰符：拖动时会让整个box一起移动 -->
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
```



## vue2

### 注册为全局指令

安装`moveDirectivePlugin`插件，会在全局安装一个`v-move`的指令，添加了v-move指令的元素可自由拖动

```js
// main.js
import Vue from 'vue'
import App from './App.vue'

import {moveDirectivePlugin} from 'lite-move'
Vue.use(moveDirectivePlugin) // 注册全局指令v-move

new Vue({
  render: (h) => h(App)
}).$mount('#app')

/*
使用：<div v-move> </div>
*/
```

### 注册为局部指令

```html
<template>
    <!-- 同样支持moveParent修饰符 -->
    <div v-move>
        <span>{{ title }}</span>
    </div>
</template>

<script>
import { moveDirectiveFor2 } from 'lite-move';
export default {
    data() {
        return {
            title: '移动',
        }
    },
    directives: {
        // 注册局部指令
        move: moveDirectiveFor2
    }
}
</script>
  
<style scoped>
div {
    width: 100px;
    height: 100px;
    border: brown 3px solid;
    background-color: green;
    cursor: move;
}
</style>
```

## 原生js

在原生环境中，将拖动函数：`liteMove.toMove()`，注册为需要拖动dom元素的mousedown事件处理函数，即可让元素实现拖动。

```html
<html lang="en">
<head>
    <title>liteMove</title>
    <style>
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
</head>

<body>
    <div class="box move" v-move>
        移动
    </div>
    <div class="box">
        <div class="top move" v-move.moveParent>移动</div>
    </div>
</body>
<script src="../dist/lite-move.umd.js"></script>
<script>
    // liteMove.toMove() 返回监听mousedown事件的处理函数，true代表移动其父元素，否则只移动自己
    const movableAction = liteMove.toMove(true);
    document.querySelector('.top').addEventListener('mousedown', movableAction);

    const movableAction2 = liteMove.toMove();
    document.querySelector('.move').addEventListener('mousedown', movableAction2);
</script>

</html>
```

