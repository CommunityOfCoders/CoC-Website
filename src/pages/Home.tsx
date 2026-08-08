import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import WhatWeDo from '../components/home/WhatWeDo';
import Throwback from '../components/home/Throwback';
import HowWeWork from '../components/home/HowWeWork';
import OpenSourceHighlight from '../components/home/OpenSourceHighlight';
import PhotoBand from '../components/home/PhotoBand';
import CommunityActivity from '../components/home/CommunityActivity';
import Ethos from '../components/home/Ethos';
import { BackdropProvider, Scene } from '../components/ui/Backdrop';
import { IMG } from '../data/placeholderImages';
import './Home.css';

/**
 * Sections wrapped in <Scene> drive the fixed photographic backdrop:
 * each one brings its own image in as it reaches mid-viewport.
 * Opaque sections (stats / throwback / bone / ethos) cover the layer,
 * and <Scene bg={null}> clears it so re-entries feel deliberate.
 */
const Home: React.FC = () => (
  <BackdropProvider>
    <Scene bg={IMG.bgHero}><Hero /></Scene>
    <Stats />
    <Scene bg={IMG.bgCommunity}><WhatWeDo /></Scene>
    <Throwback />
    <Scene bg={null}><HowWeWork /></Scene>
    <Scene bg={IMG.bgTalk}><OpenSourceHighlight /></Scene>
    <PhotoBand />
    <Scene bg={IMG.bgCrowd}><CommunityActivity /></Scene>
    <Ethos />
  </BackdropProvider>
);

export default Home;
