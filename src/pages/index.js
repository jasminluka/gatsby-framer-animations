import React from "react";
import Layout from "../components/layout";
import HomeBanner from '../components/homePage/HomeBanner';
import HomeContent from '../components/homePage/HomeContent';
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext';

const IndexPage = props => {
  const { cursorStyles } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;

    dispatch({ type: 'CURSOR_TYPE', cursorType });
  }

  return (
    <Layout>
      <HomeBanner onCursor={onCursor} />
      <HomeContent />
    </Layout>
  );
}

export default IndexPage;