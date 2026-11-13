import { useEffect, useRef } from 'react';

type Props = {
  svgList: {
    svg: SVGSVGElement;
    finishedMs: number;
  }[];
};

const Viewer = ({ svgList }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    svgList.forEach(({ svg }) => {
      if (ref.current) {
        ref.current.appendChild(svg);
      }
    });
    return () => {
      svgList.forEach(({ svg }) => {
        svg.remove();
      });
    };
  }, [svgList]);

  const repeat = Math.ceil(Math.sqrt(svgList.length));
  const grids = `repeat(${repeat}, ${100 / repeat}%)`;

  return (
    <div
      className="Viewer-container"
      style={{
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: grids,
        gridTemplateRows: grids,
      }}
      ref={ref}
    ></div>
  );
};

export default Viewer;
