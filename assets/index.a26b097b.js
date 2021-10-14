import{b as n,a as d,g as c,c as u,w as v}from"./vendor.e03dce98.js";const f=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))m(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&m(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function m(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}};f();const p=i=>i({vert:`
        precision mediump float;

        attribute vec3 position, normal;
        uniform mat4 model, view, projection;
        uniform vec3 lightPosition;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
            vNormal = normal;
            vec4 worldPosition = model * vec4(position, 1.0);
            vPosition = worldPosition.xyz;
            gl_Position = projection * view * worldPosition;
        }
    `,frag:`
        precision mediump float;

        varying vec3 vNormal, vPosition;
        uniform vec3 lightPosition;

        void main() {
            vec3 color = vec3(0.5, 0.5, 0.0);
            float intensity = max(0.0, dot(vNormal, normalize(lightPosition - vPosition)));
            float ambient = 0.2;
            gl_FragColor = vec4(ambient + intensity * color, 1.0);
        }
    `,attributes:{position:n.positions,normal:d(n.cells,n.positions)},uniforms:{model:({time:o})=>c.fromRotation([],Math.PI/2,[0,1,0]),lightPosition:({time:o})=>[0,10*Math.cos(o),10*Math.sin(o)]},elements:n.cells,count:n.cells.length*3}),g=i=>i({context:{projection:function(o){return c.perspective([],Math.PI/4,o.viewportWidth/o.viewportHeight,.01,1e3)},view:function(o,r){return c.lookAt([],r.eye,r.target,[0,1,0])},eye:i.prop("eye")},uniforms:{view:i.context("view"),projection:i.context("projection")}}),l=document.getElementById("regl-canvas");window.addEventListener("resize",u(l),!1);u(l);const s=v({canvas:l}),y=p(s);s.frame(()=>{const i=[10,20,20],o=[0,4,0];g(s)({eye:i,target:o},()=>{s.clear({color:[.6,.5,.9,1],depth:1}),y()})});
