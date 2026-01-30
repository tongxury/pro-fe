/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react';
import IconSendFill from './IconSendFill';
import IconStockFill from './IconStockFill';
import IconGasStationFill from './IconGasStationFill';
import IconArrowDownSLine from './IconArrowDownSLine';
import IconArrowLeftSLine from './IconArrowLeftSLine';
import IconArrowRightSLine from './IconArrowRightSLine';
import IconArrowUpSLine from './IconArrowUpSLine';
import IconMoneyEuroCircleLine from './IconMoneyEuroCircleLine';
import IconMoneyEuroCircleFill from './IconMoneyEuroCircleFill';
import IconArrowLeftLine from './IconArrowLeftLine';
import IconAddCircleFill from './IconAddCircleFill';
import IconAddCircleLine from './IconAddCircleLine';
import IconSettingsLine from './IconSettingsLine';
import IconSettingsFill from './IconSettingsFill';
import IconCheckboxCircleFill from './IconCheckboxCircleFill';
import IconCopyFill from './IconCopyFill';
import IconCloseCircleFill from './IconCloseCircleFill';
import IconStarFill from './IconStarFill';
import IconSearchLine from './IconSearchLine';
import IconArrowDropDownFill from './IconArrowDropDownFill';
import IconArrowDropLeftFill from './IconArrowDropLeftFill';
import IconArrowDropRightFill from './IconArrowDropRightFill';
import IconArrowDropUpFill from './IconArrowDropUpFill';
import IconFunctionFill from './IconFunctionFill';
import IconPaletteFill from './IconPaletteFill';
import IconGiftFill from './IconGiftFill';
import IconMoneyDollarBoxFill from './IconMoneyDollarBoxFill';
import IconInformationFill from './IconInformationFill';
import IconShieldKeyholeFill from './IconShieldKeyholeFill';
import IconAccountCircleFill from './IconAccountCircleFill';
import IconWallet3Fill from './IconWallet3Fill';
import IconHeartsFill from './IconHeartsFill';
import IconHeartsLine from './IconHeartsLine';
import IconMoneyDollarCircleFill from './IconMoneyDollarCircleFill';
import IconHome5Fill from './IconHome5Fill';
import IconGroupFill from './IconGroupFill';
import IconGroupLine from './IconGroupLine';
export { default as IconSendFill } from './IconSendFill';
export { default as IconStockFill } from './IconStockFill';
export { default as IconGasStationFill } from './IconGasStationFill';
export { default as IconArrowDownSLine } from './IconArrowDownSLine';
export { default as IconArrowLeftSLine } from './IconArrowLeftSLine';
export { default as IconArrowRightSLine } from './IconArrowRightSLine';
export { default as IconArrowUpSLine } from './IconArrowUpSLine';
export { default as IconMoneyEuroCircleLine } from './IconMoneyEuroCircleLine';
export { default as IconMoneyEuroCircleFill } from './IconMoneyEuroCircleFill';
export { default as IconArrowLeftLine } from './IconArrowLeftLine';
export { default as IconAddCircleFill } from './IconAddCircleFill';
export { default as IconAddCircleLine } from './IconAddCircleLine';
export { default as IconSettingsLine } from './IconSettingsLine';
export { default as IconSettingsFill } from './IconSettingsFill';
export { default as IconCheckboxCircleFill } from './IconCheckboxCircleFill';
export { default as IconCopyFill } from './IconCopyFill';
export { default as IconCloseCircleFill } from './IconCloseCircleFill';
export { default as IconStarFill } from './IconStarFill';
export { default as IconSearchLine } from './IconSearchLine';
export { default as IconArrowDropDownFill } from './IconArrowDropDownFill';
export { default as IconArrowDropLeftFill } from './IconArrowDropLeftFill';
export { default as IconArrowDropRightFill } from './IconArrowDropRightFill';
export { default as IconArrowDropUpFill } from './IconArrowDropUpFill';
export { default as IconFunctionFill } from './IconFunctionFill';
export { default as IconPaletteFill } from './IconPaletteFill';
export { default as IconGiftFill } from './IconGiftFill';
export { default as IconMoneyDollarBoxFill } from './IconMoneyDollarBoxFill';
export { default as IconInformationFill } from './IconInformationFill';
export { default as IconShieldKeyholeFill } from './IconShieldKeyholeFill';
export { default as IconAccountCircleFill } from './IconAccountCircleFill';
export { default as IconWallet3Fill } from './IconWallet3Fill';
export { default as IconHeartsFill } from './IconHeartsFill';
export { default as IconHeartsLine } from './IconHeartsLine';
export { default as IconMoneyDollarCircleFill } from './IconMoneyDollarCircleFill';
export { default as IconHome5Fill } from './IconHome5Fill';
export { default as IconGroupFill } from './IconGroupFill';
export { default as IconGroupLine } from './IconGroupLine';

export type IconNames = 'send-fill' | 'stock-fill' | 'gas-station-fill' | 'arrow-down-s-line' | 'arrow-left-s-line' | 'arrow-right-s-line' | 'arrow-up-s-line' | 'money-euro-circle-line' | 'money-euro-circle-fill' | 'arrow-left-line' | 'add-circle-fill' | 'add-circle-line' | 'settings-line' | 'settings-fill' | 'checkbox-circle-fill' | 'copy-fill' | 'close-circle-fill' | 'star-fill' | 'search-line' | 'arrow-drop-down-fill' | 'arrow-drop-left-fill' | 'arrow-drop-right-fill' | 'arrow-drop-up-fill' | 'function-fill' | 'palette-fill' | 'gift-fill' | 'money-dollar-box-fill' | 'information-fill' | 'shield-keyhole-fill' | 'account-circle-fill' | 'wallet-3-fill' | 'hearts-fill' | 'hearts-line' | 'money-dollar-circle-fill' | 'home-5-fill' | 'group-fill' | 'group-line';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'send-fill':
      return <IconSendFill {...rest} />;
    case 'stock-fill':
      return <IconStockFill {...rest} />;
    case 'gas-station-fill':
      return <IconGasStationFill {...rest} />;
    case 'arrow-down-s-line':
      return <IconArrowDownSLine {...rest} />;
    case 'arrow-left-s-line':
      return <IconArrowLeftSLine {...rest} />;
    case 'arrow-right-s-line':
      return <IconArrowRightSLine {...rest} />;
    case 'arrow-up-s-line':
      return <IconArrowUpSLine {...rest} />;
    case 'money-euro-circle-line':
      return <IconMoneyEuroCircleLine {...rest} />;
    case 'money-euro-circle-fill':
      return <IconMoneyEuroCircleFill {...rest} />;
    case 'arrow-left-line':
      return <IconArrowLeftLine {...rest} />;
    case 'add-circle-fill':
      return <IconAddCircleFill {...rest} />;
    case 'add-circle-line':
      return <IconAddCircleLine {...rest} />;
    case 'settings-line':
      return <IconSettingsLine {...rest} />;
    case 'settings-fill':
      return <IconSettingsFill {...rest} />;
    case 'checkbox-circle-fill':
      return <IconCheckboxCircleFill {...rest} />;
    case 'copy-fill':
      return <IconCopyFill {...rest} />;
    case 'close-circle-fill':
      return <IconCloseCircleFill {...rest} />;
    case 'star-fill':
      return <IconStarFill {...rest} />;
    case 'search-line':
      return <IconSearchLine {...rest} />;
    case 'arrow-drop-down-fill':
      return <IconArrowDropDownFill {...rest} />;
    case 'arrow-drop-left-fill':
      return <IconArrowDropLeftFill {...rest} />;
    case 'arrow-drop-right-fill':
      return <IconArrowDropRightFill {...rest} />;
    case 'arrow-drop-up-fill':
      return <IconArrowDropUpFill {...rest} />;
    case 'function-fill':
      return <IconFunctionFill {...rest} />;
    case 'palette-fill':
      return <IconPaletteFill {...rest} />;
    case 'gift-fill':
      return <IconGiftFill {...rest} />;
    case 'money-dollar-box-fill':
      return <IconMoneyDollarBoxFill {...rest} />;
    case 'information-fill':
      return <IconInformationFill {...rest} />;
    case 'shield-keyhole-fill':
      return <IconShieldKeyholeFill {...rest} />;
    case 'account-circle-fill':
      return <IconAccountCircleFill {...rest} />;
    case 'wallet-3-fill':
      return <IconWallet3Fill {...rest} />;
    case 'hearts-fill':
      return <IconHeartsFill {...rest} />;
    case 'hearts-line':
      return <IconHeartsLine {...rest} />;
    case 'money-dollar-circle-fill':
      return <IconMoneyDollarCircleFill {...rest} />;
    case 'home-5-fill':
      return <IconHome5Fill {...rest} />;
    case 'group-fill':
      return <IconGroupFill {...rest} />;
    case 'group-line':
      return <IconGroupLine {...rest} />;

  }

  return null;
};

export default IconFont;
