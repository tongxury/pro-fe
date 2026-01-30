
export const creditCostAsset = 10


export const videoGenerationCategoryConfig = {
    videoGeneration: {
        name: '视频生成',
    },
    transition: {
        name: '过度帧',
    }
}


export const aspectRatioConfig = {
    '21:9': '21:9',
    '16:9': '16:9',
    '4:3': '4:3',
    '1:1': '1:1',
    '3:4': '3:4',
    '9:16': '9:16'
}

export const typedTagsConfig = {
    emotion: {
        name: '情绪',
    },
    shootingStyle: {
        name: "拍摄"
    },
    scene: {
        name: "场景"
    },
    action: {
        name: "动作"
    },
    person: {
        name: "人物"
    },
    text: {
        name: "文案"
    },
    focusOn: {
        name: "重点阐述"
    },
    picture: {
        name: "画面"
    }
}

export const issueConfig = {
    'templateReplication': {
        label: '智能成片',
        color: 'text-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-100/50'
    },
    'segmentReplication': {
        label: '片段复刻',
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        border: 'border-blue-100/50'
    }
}

export const workflowConfig = {
    status: {
        running: {
            name: '运行中',
            color: 'processing',
            bg: 'bg-blue-50'
        },
        completed: {
            name: '完成',
            color: 'success',
            bg: 'bg-green-50'
        },
        canceled: {
            name: '已取消',
            color: 'default',
            bg: 'bg-gray-50'
        },
        paused: {
            name: '已暂停',
            color: 'warning',
            bg: 'bg-yellow-50'
        }
    }
}


export const assetWorkflowJobConfig = {
    commodityAnalysisJob: {
        label: '商品分析',
        dataKeys: ['commodityAnalysis'],
        status: {
            waiting: {
                name: '商品分析等待中',
                color: 'text-gray-500',
                bg: 'bg-gray-50'
            },
            running: {
                name: '商品分析运行中',
                color: 'text-blue-500',
                bg: 'bg-blue-50'
            },
            confirming: {
                name: '商品分析确认中',
                color: 'text-yellow-500',
                bg: 'bg-yellow-50'
            },
            completed: {
                name: '商品分析完成',
                color: 'text-green-500',
                bg: 'bg-green-50'
            },
            canceled: {
                name: '商品分析已取消',
                color: 'text-gray-400',
                bg: 'bg-gray-50'
            }
        },
    },
    videoGenerationJob: {
        label: '视频生成',
        dataKeys: ['videoGenerations'],
        status: {
            waiting: {
                name: '视频生成等待中',
                color: 'text-gray-500',
                bg: 'bg-gray-50'
            },
            running: {
                name: '视频生成运行中',
                color: 'text-blue-500',
                bg: 'bg-blue-50'
            },
            confirming: {
                name: '视频生成确认中',
                color: 'text-yellow-500',
                bg: 'bg-yellow-50'
            },
            completed: {
                name: '视频生成完成',
                color: 'text-green-500',
                bg: 'bg-green-50'
            },
            canceled: {
                name: '视频生成已取消',
                color: 'text-gray-400',
                bg: 'bg-gray-50'
            }
        },
    },
    keyFramesGenerationJob: {
        label: '关键帧生成',
        dataKeys: ['keyFrames'],
        status: {
            waiting: {
                name: '关键帧生成等待中',
                color: 'text-gray-500',
                bg: 'bg-gray-50'
            },
            running: {
                name: '关键帧生成运行中',
                color: 'text-blue-500',
                bg: 'bg-blue-50'
            },
            confirming: {
                name: '关键帧生成确认中',
                color: 'text-yellow-500',
                bg: 'bg-yellow-50'
            },
            completed: {
                name: '关键帧生成完成',
                color: 'text-green-500',
                bg: 'bg-green-50'
            },
            canceled: {
                name: '关键帧生成已取消',
                color: 'text-gray-400',
                bg: 'bg-gray-50'
            }
        },
    },
    segmentScriptJob: {
        label: '分镜脚本生成',
        dataKeys: ['segmentScript'],
        status: {
            waiting: {
                name: '脚本生成等待中',
                color: 'text-gray-500',
                bg: 'bg-gray-50'
            },
            running: {
                name: '脚本生成运行中',
                color: 'text-blue-500',
                bg: 'bg-blue-50'
            },
            confirming: {
                name: '脚本生成确认中',
                color: 'text-yellow-500',
                bg: 'bg-yellow-50'
            },
            completed: {
                name: '脚本生成完成',
                color: 'text-green-500',
                bg: 'bg-green-50'
            },
            canceled: {
                name: '脚本生成已取消',
                color: 'text-gray-400',
                bg: 'bg-gray-50'
            }
        },
    },
    commodityReplacementJob: {
        label: '商品替换',
        status: {
            waiting: {
                name: '商品替换等待中',
                color: 'text-gray-500',
                bg: 'bg-gray-50'
            },
            running: {
                name: '商品替换运行中',
                color: 'text-blue-500',
                bg: 'bg-blue-50'
            },
            confirming: {
                name: '商品替换确认中',
                color: 'text-yellow-500',
                bg: 'bg-yellow-50'
            },
            completed: {
                name: '商品替换完成',
                color: 'text-green-500',
                bg: 'bg-green-50'
            },
            canceled: {
                name: '商品替换已取消',
                color: 'text-gray-400',
                bg: 'bg-gray-50'
            }
        },
    },
    videoSegmentsGenerationJob: {
        label: '多片段复刻',
        dataKeys: ['videoGenerations'],
        status: {
            waiting: {
                name: '多片段复刻等待中',
                color: 'text-gray-500',
                bg: 'bg-gray-50'
            },
            running: {
                name: '多片段复刻运行中',
                color: 'text-blue-500',
                bg: 'bg-blue-50'
            },
            confirming: {
                name: '多片段复刻确认中',
                color: 'text-yellow-500',
                bg: 'bg-yellow-50'
            },
            completed: {
                name: '多片段复刻完成',
                color: 'text-green-500',
                bg: 'bg-green-50'
            },
            canceled: {
                name: '多片段复刻已取消',
                color: 'text-gray-400',
                bg: 'bg-gray-50'
            }
        },
    },
    videoSegmentsRemixJob: {
        label: '多片段混剪',
        dataKeys: ['remix'],
        status: {
            waiting: {
                name: '多片段混剪等待中',
                color: 'text-gray-500',
                bg: 'bg-gray-50'
            },
            running: {
                name: '多片段混剪运行中',
                color: 'text-blue-500',
                bg: 'bg-blue-50'
            },
            confirming: {
                name: '多片段混剪确认中',
                color: 'text-yellow-500',
                bg: 'bg-yellow-50'
            },
            completed: {
                name: '多片段混剪完成',
                color: 'text-green-500',
                bg: 'bg-green-50'
            },
            canceled: {
                name: '多片段混剪已取消',
                color: 'text-gray-400',
                bg: 'bg-gray-50'
            }
        },
    }
}



export const taskStatusConfig = {
    chanceSelecting: {
        name: '选择卖点中',
        color: 'text-blue-500',
        bg: 'bg-blue-50'
    },

    templateSelecting: {
        name: '选择模版中',
        color: 'text-amber-500',
        bg: 'bg-amber-50'
    },
    generating: {
        name: '视频生成中',
        color: 'text-green-500',
        bg: 'bg-green-50'
    }
}

export const assetStatusConfig = {
    promptGenerating: {
        name: '文案生成中',
        color: 'text-blue-500',
        bg: 'bg-blue-50'
    },
    promptGenerated: {
        name: '文案已生成',
        color: 'text-amber-500',
        bg: 'bg-amber-50'
    },
    generating: {
        name: '视频生成中',
        color: 'text-green-500',
        bg: 'bg-green-50'
    },
    completed: {
        name: '视频生成中',
        color: 'text-green-500',
        bg: 'bg-green-50'
    },
    failed: {
        name: '视频生成中',
        color: 'text-green-500',
        bg: 'bg-green-50'
    }
}
