import React from 'react'
import styled from "styled-components"

interface props {
    className?: string,
    leftAction?: React.ReactNode,
    rightAction?: React.ReactNode,
    vp?: string,
    pt?: string,
    pb?: string
}

const ActionContainerComp = ({ className, leftAction, rightAction, vp, pb, pt }: props) => {

    return (
        <div className={className}>
            <div className='action-container__left'>
                {leftAction}
            </div>
            <div className='action-container__right'>
                {rightAction}
            </div>
        </div>
    )
}

const ActionContainer = styled(ActionContainerComp)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    padding: 0;
    padding-top: ${({vp, pt}) => vp || pt || "0"};
    padding-bottom: ${({ vp, pb }) => vp || pb || "0"};
    margin-bottom: -8px;
    .action-container {
        &__right {
            display: inline-flex;
            justify-content: flex-end;
            flex-grow: 1;
            margin-bottom: 8px;
            > button, > a, > [role="button"] {
                margin-right: 16px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
        &__left {
            display: inline-flex;
            justify-content: flex-start;
            flex-grow: 1;
            margin-bottom: 8px;
            > button, > a, > [role="button"] {
                margin-left: 16px;
                &:first-child {
                    margin-left: 0;
                }
            }
        }
    }
`

export default ActionContainer