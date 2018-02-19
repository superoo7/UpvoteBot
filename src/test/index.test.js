import moment from 'moment';
import {
  aboutPost,
  checkPostAge,
  weightageForPost,
  beautifyDate
} from '../index';
import regexTest from './regex.test';
import { main, upvote } from '../index';

// REGEX TEST
regexTest();

// main
const config = {
  maximumPostAge: 302400000,
  minimumPostAge: 1800000,
  minimumLength: 250,
  optimumLength: 4000
};

main('achraf6', 'animals-d9985c0daad41', config).then(
  data => console.log(data)
);
