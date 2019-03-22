import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { theme, DESKTOP_WIDTH, MOBILE_WIDTH } from "../../config";

import ContentBox from "./content-box";
import Content from "./content";
import Hr from "./hr";
import Title from "./title";

const ICON_CLIPBOARD = require("../../assets/images/icon_clipboard.svg");

const ContentBold = styled(Content)`
  margin-top: 25px;
  font-weight: bold;
  min-height: 28px;
`;

const ContinueButton = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  background-color: ${props => props.theme.button.background};
  border: none;
  color: ${props => props.theme.button.color};
  font-size: 16px;
  font-stretch: ${props => props.theme.fontStretch};
  font-style: ${props => props.theme.fontStyle};
  height: 40px;
  letter-spacing: ${props => props.theme.letterSpacing};
  line-height: ${props => props.theme.lineHeight};
  margin: auto;
  text-align: center;
  width: 171px;

  @media (max-width: ${DESKTOP_WIDTH}px) {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  text-align: right;
  margin: 25px 0;
  @media only screen and (max-width: ${DESKTOP_WIDTH}px)
    text-align: center;
  }
`;

const InputWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  @media only screen and (max-width: ${MOBILE_WIDTH}px) {
    display: block;
  }
`;
const InputColumnWrapper = styled.div`
  flex: 50%;
`;

const Input = styled.input.attrs({
  type: "text"
})`
  background: transparent;
  border: 1px solid ${props => props.theme.input.border.color};
  outline: none;
  padding: 10px;
  width: 80%;

  @media only screen and (max-width: ${MOBILE_WIDTH}px) {
    width: 90%;
  }
`;

const Label = styled.h3`
  color: ${props => props.theme.label.color};
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.7px;
  line-height: normal;
`;

const HandleWrapper = styled.div`
  align-items: center;
  background-color: ${props => props.theme.password.background};
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Handle = styled.span`
  color: white;
  font-size: 12px;
`;

const ClipboardIcon = styled.img`
  cursor: pointer;
  height: 20px;
  width: 20px;
`;

interface RecordStorageHandleProps {
  handle;
  setStoragePin;
}

interface RecordStorageHandleState {
  storagePin;
  retypedStoragePin;
}

class RecordStorageHandleSlide extends Component<
  RecordStorageHandleProps,
  RecordStorageHandleState
> {
  state = {
    storagePin: "",
    retypedStoragePin: ""
  };

  save (storagePin) {
    const { setStoragePin } = this.props;
    setStoragePin(storagePin);
  }

  render () {
    const { handle } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <ContentBox>
          <Title>Record Storage Handle and PIN</Title>
          <Hr />
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac massa
            vestibulum, vestibulum nunc in, imperdiet augue. Phasellus nisl est,
            tristique ac magna sed. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Ut ac massa vestibulum, vestibulum nunc in,
            imperdiet
          </Content>
          <ContentBold>
            Phaugue. Phasellus nisl est, tristique ac magna sed:
          </ContentBold>
          <Label>Storage Handle</Label>
          <HandleWrapper>
            <Handle>{handle}</Handle>
            <CopyToClipboard text={handle}>
              <ClipboardIcon src={ICON_CLIPBOARD} />
            </CopyToClipboard>
          </HandleWrapper>
          <InputWrapper>
            <InputColumnWrapper>
              <Label>Choose Storage PIN</Label>
              <Input
                name="storage-pin"
                onChange={e => this.setState({ storagePin: e.target.value })}
              />
            </InputColumnWrapper>
            <InputColumnWrapper>
              <Label>Re-Type Storage PIN</Label>
              <Input
                name="retyped-storage-pin"
                onChange={e =>
                  this.setState({ retypedStoragePin: e.target.value })
                }
              />
            </InputColumnWrapper>
          </InputWrapper>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac massa
            vestibulum, vestibulum nunc in, imperdiet augue. Phasellus nisl est,
            tristique ac magna sed.
          </Content>
          <ButtonWrapper>
            <ContinueButton
              disabled={this.state.storagePin.length === 0}
              onClick={() => {
                this.state.storagePin === this.state.retypedStoragePin
                  ? this.save(this.state.storagePin)
                  : alert(
                    "Your storage PINs do not match. Please type them again."
                    );
              }}
            >
              Continue
            </ContinueButton>
          </ButtonWrapper>
        </ContentBox>
      </ThemeProvider>
    );
  }
}

export default RecordStorageHandleSlide;