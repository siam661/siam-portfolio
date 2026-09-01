import { useEffect } from 'react';
import Nav from './components/Nav';
import CustomCursor from './components/CustomCursor';
import Grain from './components/Grain';
import Particles from './components/Particles';
import Intro from './sections/Intro';
import ChapterBeginning from './sections/ChapterBeginning';
import ChapterCraft from './sections/ChapterCraft';
import ChapterWork from './sections/ChapterWork';
import ChapterDetails from './sections/ChapterDetails';
import FinalContact from './sections/FinalContact';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useIsTouchDevice } from './hooks/useIsTouchDevice';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  useSmoothScroll(reducedMotion);

  useEffect(() => {
    document.documentElement.style.background = '#08080f';
  }, []);

  return (
    <div className="bg-bg text-ink font-body">
      <Particles />
      <Grain />
      <CustomCursor enabled={!isTouch} />
      <Nav />

      <main>
        <Intro reducedMotion={reducedMotion} />
        <ChapterBeginning reducedMotion={reducedMotion} />
        <ChapterCraft reducedMotion={reducedMotion} />
        <ChapterWork reducedMotion={reducedMotion} />
        <ChapterDetails />
        <FinalContact reducedMotion={reducedMotion} />
      </main>
    </div>
  );
}
