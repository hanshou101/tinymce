/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import { Fun } from '@ephox/katamari';
import * as CaretRangeFromPoint from '../../selection/CaretRangeFromPoint';
import * as NormalizeRange from '../../selection/NormalizeRange';
import * as RangeCompare from '../../selection/RangeCompare';
import * as RangeNodes from '../../selection/RangeNodes';
import { RangeLikeObject } from '../../selection/RangeTypes';
import * as RangeWalk from '../../selection/RangeWalk';
import * as SplitRange from '../../selection/SplitRange';
import DOMUtils from './DOMUtils';

interface RangeUtils {
  walk (rng: Range, callback: (nodes: Node[]) => void): void;
  split (rng: Range): RangeLikeObject;
  normalize (rng: Range): boolean;
}

/**
 * This class contains a few utility methods for ranges.
 *
 * @class tinymce.dom.RangeUtils
 */
const RangeUtils = (dom: DOMUtils): RangeUtils => {
  /**
   * Walks the specified range like object and executes the callback for each sibling collection it finds.
   *
   * @private
   * @method walk
   * @param {Object} rng Range like object.
   * @param {function} callback Callback function to execute for each sibling collection.
   */
  const walk = (rng, callback) => {
    return RangeWalk.walk(dom, rng, callback);
  };

  /**
   * Splits the specified range at it's start/end points.
   *
   * @private
   * @param {Range/RangeObject} rng Range to split.
   * @return {Object} Range position object.
   */
  const split = SplitRange.split;

  /**
   * Normalizes the specified range by finding the closest best suitable caret location.
   *
   * @private
   * @param {Range} rng Range to normalize.
   * @return {Boolean} True/false if the specified range was normalized or not.
   */
  const normalize = (rng: Range): boolean => {
    return NormalizeRange.normalize(dom, rng).fold(
      Fun.never,
      (normalizedRng) => {
        rng.setStart(normalizedRng.startContainer, normalizedRng.startOffset);
        rng.setEnd(normalizedRng.endContainer, normalizedRng.endOffset);
        return true;
      }
    );
  };

  return {
    walk,
    split,
    normalize
  };
};

/**
 * Compares two ranges and checks if they are equal.
 *
 * @static
 * @method compareRanges
 * @param {DOMRange} rng1 First range to compare.
 * @param {DOMRange} rng2 First range to compare.
 * @return {Boolean} true/false if the ranges are equal.
 */
RangeUtils.compareRanges = RangeCompare.isEq;

/**
 * Gets the caret range for the given x/y location.
 *
 * @static
 * @method getCaretRangeFromPoint
 * @param {Number} clientX X coordinate for range
 * @param {Number} clientY Y coordinate for range
 * @param {Document} doc Document that x/y are relative to
 * @returns {Range} caret range
 */
RangeUtils.getCaretRangeFromPoint = CaretRangeFromPoint.fromPoint as (clientX: number, clientY: number, doc: Document) => Range;

RangeUtils.getSelectedNode = RangeNodes.getSelectedNode as (range: Range) => Node;
RangeUtils.getNode = RangeNodes.getNode;

export default RangeUtils;
