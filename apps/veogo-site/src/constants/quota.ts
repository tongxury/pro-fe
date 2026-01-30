const quotaItems = [
    {
        scene: 'preAnalysis',
        promptId: 'improveSuggestion',
        cost: 40,
        title: 'goToPreAndConfirm',
        // cannotRefund: true,
    },
    {
        scene: 'preAnalysis',
        promptId: 'preAnalysis',
        cost: 40,
        title: 'goToPreAndConfirm',
        // cannotRefund: true,
    },
    {
        scene: 'preAnalysis',
        promptId: 'preAnalysisImages',
        cost: 20,
        title: 'goToPreAndConfirm',
    },
    {
        scene: 'limitAnalysis',
        promptId: 'limitAnalysis',
        cost: 40,
        title: 'goToPreAndConfirm',
        // cannotRefund: true,
    },
    {
        scene: 'limitAnalysis',
        promptId: 'limitAnalysisImages',
        cost: 20,
        title: 'goToPreAndConfirm',
    },
    {
        scene: 'analysis',
        promptId: 'analysis',
        cost: 40,
        title: 'goToPreAndConfirm',
        // cannotRefund: true,
    },
    {
        scene: 'analysis',
        promptId: 'analysisImages',
        cost: 20,
        title: 'goToPreAndConfirm',
    },
    {
        scene: 'coverAnalysis',
        promptId: 'coverAnalysisImages',
        cost: 30,
        title: 'goToPreAndConfirm',
        // cannotRefund: true,
    },
    {
        scene: 'duplicateScript',
        promptId: 'duplicateScript',
        cost: 40,
        title: 'goToPreAndConfirm',
        // cannotRefund: true,
    },
]

export function getCostV2( promptId: string): number {
    return quotaItems?.filter((item) =>
        item.promptId === promptId)?.[0]?.cost || 10
}


export function getCost(scene: string, promptId: string): number {
    return quotaItems?.filter((item) =>
        item.scene === scene && item.promptId === promptId)?.[0]?.cost || 10
}

export function getFunConfig(scene: string, promptId: string) {
    return quotaItems?.filter((item) =>
        item.scene === scene && item.promptId === promptId)?.[0]
}
