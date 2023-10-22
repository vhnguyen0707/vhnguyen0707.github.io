import firebase from '../assets/tech/be/firebase.png';
import mongoDb from '../assets/tech/be/mongodb.svg';
import nodeJs from '../assets/tech/be/nodejs.svg';
import python from '../assets/tech/be/python.svg';
import sql from '../assets/tech/be/SQL.png'
import java from '../assets/tech/be/java.svg';
import css from '../assets/tech/fe/css3.svg';
import html from '../assets/tech/fe/html5.svg';
import javascript from '../assets/tech/fe/javascript.svg';
import sass from '../assets/tech/fe/sass.svg';
import ts from '../assets/tech/fe/typescript.svg';

import djangoRest from '../assets/tech/frameworks/django.svg' 
import express from '../assets/tech/frameworks/express.svg';
import react from '../assets/tech/frameworks/react.svg';
import redux from '../assets/tech/frameworks/redux.svg';

import aws from '../assets/tech/other/aws.svg';
import figma from '../assets/tech/other/figma.svg';
import git from '../assets/tech/other/git.svg';
import github from '../assets/tech/other/github.svg';
import postman from '../assets/tech/other/postman.svg';
import vite from '../assets/tech/other/vite.svg';

const getId = (() => {
    let id = 0;
    return () => id++;
})();
export const fe = [
    {id: getId(), name: 'HTML', pic: html},
    {id: getId(), name: 'CSS', pic: css},
    {id: getId(), name: 'JavaScript', pic: javascript},
    {id: getId(), name: 'TypeScript', pic: ts},
    {id: getId(), name: 'SASS', pic: sass}
]

export const be = [
    {id: getId(), name: 'Python', pic: python},
    {id: getId(), name: 'Node.js', pic: nodeJs},
    {id: getId(), name: 'SQL', pic: sql},
    {id: getId(), name: 'MongoDB', pic: mongoDb},
    {id: getId(), name: 'Firebase', pic: firebase},
    {id: getId(), name: 'Java', pic: java},
]

export const frameworks = [
    {id: getId(), name: 'React', pic: react},
    {id: getId(), name: 'Django+DRF', pic: djangoRest},
    {id: getId(), name: 'Express', pic: express},
    {id: getId(), name: 'Redux', pic: redux},
]

export const others = [
    {id: getId(), name: 'GIT', pic: git},
    {id: getId(), name: 'GitHub', pic: github},
    {id: getId(), name: 'Postman', pic: postman},
    {id: getId(), name: 'AWS', pic: aws},
    {id: getId(), name: 'Vite', pic: vite},
    {id: getId(), name: 'Figma', pic: figma},
]