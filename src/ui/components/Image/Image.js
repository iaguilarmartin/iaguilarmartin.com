import React from 'react';
import PropTypes from 'prop-types';

import srcSetShape from '../../shapes/srcSet';
import imageSourceShape from '../../shapes/imageSource';

const formatSrcSet = (x2, x3) => {
  if (!x2 && !x3) return undefined;

  const srcsets = [];
  if (x2) {
    srcsets.push(`${x2} 2x`);
  }

  if (x3) {
    srcsets.push(`${x3} 3x`);
  }

  return srcsets.join(', ');
};

const parseSrc = src => {
  if (typeof src === 'string') {
    return {
      imageSrc: src
    };
  }

  if (src.x1) {
    return {
      imageSrc: src.x1,
      imageSrcSet: formatSrcSet(src.x2, src.x3)
    };
  }

  if (Array.isArray(src)) {
    const sources = [];
    let defaultSource;

    src.forEach(({ mediaQuery, srcSet }) => {
      const parsedSrcSet = parseSrc(srcSet);

      if (!mediaQuery) {
        defaultSource = parsedSrcSet;
        return;
      }

      const mq =
        typeof mediaQuery === 'string'
          ? mediaQuery
          : `(min-width: ${mediaQuery}px)`;

      const ss = `${parsedSrcSet.imageSrc}, ${parsedSrcSet.imageSrcSet}`;

      sources.push({
        mediaQuery: mq,
        srcSet: ss
      });
    });

    if (!defaultSource) {
      throw new Error('No default source provided');
    }

    return {
      sources,
      imageSrc: defaultSource.imageSrc,
      imageSrcSet: defaultSource.imageSrcSet
    };
  }

  throw new Error('Unkwon Image src type');
};

const Image = ({ src, alt, height, width, className }) => {
  const renderImgElement = (imageSrc, imageSrcSet) => (
    <img
      alt={alt}
      className={className}
      height={height}
      width={width}
      src={imageSrc}
      srcSet={imageSrcSet}
    />
  );

  const { imageSrc, imageSrcSet, sources } = parseSrc(src);

  return sources && sources.length > 0 ? (
    <picture>
      {sources.map(({ mediaQuery, srcSet }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <source key={index} media={mediaQuery} srcSet={srcSet} />
      ))}
      {renderImgElement(imageSrc, imageSrcSet)}
    </picture>
  ) : (
    renderImgElement(imageSrc, imageSrcSet)
  );
};

Image.defaultProps = {
  height: undefined,
  width: undefined,
  className: null
};

Image.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    srcSetShape,
    PropTypes.arrayOf(imageSourceShape)
  ]).isRequired,
  alt: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string
};

export default Image;
