import type {GradientColorProps as XGradientColorProps, Option_ as XOption, Size as XSize} from "./base";
import XIconButton from "./button/icon_button";
import XTextButton from "./button/text_button";
import XGlowingButton from "./button/glowing_button";
import {Card as XCard} from "./card";
import XHoverable from "./container/Hoverable";
import XDivider from "./divider";
import {Flex as XFlex} from "./flex";
import {Grid as XGrid} from "./grid";
import {base64toFile, fileToBase64} from "./helper";
import {Image_ as XImage, ImageBackground as XImageBackground} from "./image";
import {InputTextArea as XInputTextArea} from "./input/text_area";
import XList from "./list";
import {MenuOption as XMenuOption, MenuProps as XMenuProps, TextMenuProps as XTextMenuProps} from "./menu";
import XTextMenu from "./menu/text_menu";
import {useTheme as useXTheme, ConfigProvider as XConfigProvider} from "./provider";
import {CardSelector as XCardSelector} from "./selector/CardSeletor";
import XSelector from "./selector/Seletor";
import XParagraph from "./typography/paragraph";
import XBasicTabs from "./tab/BasicTabs";
import XTextTabs from "./tab/TextTabs";
import XIconText from "./icontext";
import XInput from "./input";
import XLetterAvatar from "./latter_avatar"
import {
    backgroundImage as xBackgroundImage,
    borderRadius as xBorderRadius,
    boxShadow as xBoxShadow,
    linearGradient as xLinearGradient,
    margin as xMargin,
    padding as xPadding,
    position as xPosition,
    transition as xTransition
} from "./styles/utils";
import XSwitch from "./switch";
import XNumberTabs from "./tab/NumberTabs";
import {Tag as XTag} from "./tag";
import {LinearGradientText as XLinearGradientText} from "./text/linear_gradient_text";
import {Text_ as XText} from "./text/text";
import {Uploader as XUploader} from "./uploader";
import XUserCard from "./usercard";

export type {XMenuOption, XMenuProps, XTextMenuProps, XGradientColorProps, XOption, XSize};

export {
    xTransition,
    xPosition,
    xBackgroundImage,
    xLinearGradient,
    xBoxShadow,
    xBorderRadius,
    xPadding,
    xMargin
};

export {base64toFile, fileToBase64};

export {
    XCardSelector,
    XInputTextArea,
    XUploader,
    XTextMenu,
    // XButton,
    XTextButton,
    XIconButton,
    XText,
    XLinearGradientText,
    XTag,
    XCard,
    XImage,
    XImageBackground,
    XFlex,
    XGrid,
    XConfigProvider,
    useXTheme,
    XList,
    XSwitch,
    XUserCard,
    XHoverable,
    XSelector,
    XNumberTabs,
    XBasicTabs,
    XTextTabs,
    XDivider,
    XParagraph,
    XIconText,
    XInput,
    XGlowingButton,
    XLetterAvatar
};
