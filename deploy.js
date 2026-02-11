import { exec } from 'child_process';

// 获取命令行参数
const args = process.argv.slice(2);
const [repo, hubId, cat, env, version] = args;

const registryTag = `usernx/${hubId}:${version}`

// await exec(`
// yarn install && yarn build:${repo}:${env} &&
// docker build -t ${registry}/proreg/${repo}:${version} --build-arg REPO=${repo} -f Dockerfile-${cat} . &&
// echo pro@Registry | docker login --username tongxurt丶 --password-stdin ${registry} && docker push ${registry}/proreg/${repo}:${version}
// `, (error, stdout, stderr) => {
//     console.log(stdout);
//     console.error(stderr, error);
// });

// 封装 exec 为返回 Promise 的函数
const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        const process = exec(command);

        // 实时打印标准输出
        process.stdout.on('data', (data) => {
            console.log(data);
        });

        // 实时打印错误输出
        process.stderr.on('data', (data) => {
            console.error(data);
        });

        // 处理进程结束事件
        process.on('close', (code) => {
            if (code !== 0) {
                reject(`命令 "${command}" 执行失败，退出代码: ${code}`);
            } else {
                resolve(`命令 "${command}" 执行成功`);
            }
        });
    });
};



const execute = async () => {
    try {
        await runCommand('pnpm install')
        await runCommand(`pnpm build:${repo}:${env}`)



        //
        await runCommand(`docker buildx build --platform linux/arm64 -t yoozy-cn-shanghai.cr.volces.com/ve/${repo}:${version} --build-arg REPO=${repo} --build-arg APP_ENV=${env} -f Dockerfile-${cat} . --push`)

        // await runCommand(`docker tag ${registryTag} yoozy-cn-shanghai.cr.volces.com/ve/${repo}:${version}`)
        // await runCommand(`docker push yoozy-cn-shanghai.cr.volces.com/ve/${repo}:${version}`)


        // await runCommand(`echo pro@Registry | docker login --username tongxurt丶 --password-stdin ${registry}`)

        // await runCommand(`docker push ${registryTag}`)

        // await runCommand(`docker tag ${registryTag} proj-registry.cn-hangzhou.cr.aliyuncs.com/proj/${hubId}:${version}`)
        // await runCommand(`docker push proj-registry.cn-hangzhou.cr.aliyuncs.com/proj/${hubId}:${version}`)

        // await runCommand(`aws ecr get-login-password --region cn-north-1 | docker login --username AWS --password-stdin 501487856280.dkr.ecr.cn-north-1.amazonaws.com.cn`)
        // await runCommand(`docker tag ${registryTag} 501487856280.dkr.ecr.cn-north-1.amazonaws.com.cn/${repo}:${version}`)
        // await runCommand(`docker push 501487856280.dkr.ecr.cn-north-1.amazonaws.com.cn/${repo}:${version}`)
        //
        // await runCommand(`docker tag ${registryTag} 501487856280.dkr.ecr.cn-north-1.amazonaws.com.cn/${repo}:${version}`)
        // await runCommand(`docker push 501487856280.dkr.ecr.cn-north-1.amazonaws.com.cn/${repo}:${version}`)


        // // 阿里云
        // // docker login crpi-yju5wi02oeo074jw.cn-hangzhou.personal.cr.aliyuncs.com -u nick1153926706 -p veogo.ai
        // await runCommand("docker login crpi-yju5wi02oeo074jw.cn-hangzhou.personal.cr.aliyuncs.com -u nick1153926706 -p veogo.ai")
        // const aliyunRegistryTag = `crpi-yju5wi02oeo074jw.cn-hangzhou.personal.cr.aliyuncs.com/${registryTag}`
        // await runCommand(`docker build -t ${aliyunRegistryTag} --build-arg REPO=${repo} --build-arg APP_ENV=${env} -f Dockerfile-${cat} . `)
        // await runCommand(`docker push ${aliyunRegistryTag}`)


        //     await runCommand(`
        //     curl -X PUT \\
        // -H "Content-Type: application/yaml" \\
        // -H "Cookie: KuboardUsername=admin; KuboardAccessKey=5t8cfdibws6j.wi436t7c33jyszrj5ahtzctsk4zfpjtf" \\
        // -d '{"kind":"deployments","namespace":"prod","name":"veogo-site"}' \\
        // "http://13.250.116.182:18060/kuboard-api/cluster/eks-cn/kind/CICDApi/admin/resource/restartWorkload"
        //     `)

        // docker tag 2adb8d31d3f6 crpi-yju5wi02oeo074jw.cn-hangzhou.personal.cr.aliyuncs.com/usernx/veogo-web:latest
        // docker push crpi-yju5wi02oeo074jw.cn-hangzhou.personal.cr.aliyuncs.com/usernx/veogo-web:latest

        //      if (env === 'staging') {
        //
        //          await runCommand(`curl -X PUT \\
        //          -H "Content-Type: application/yaml" \\
        //          -H "Cookie: KuboardUsername=admin; KuboardAccessKey=za38kenycbrb.e8dpw8c3wmxcesyrh48wk4fat5kb6may" \\
        //          -d '{"kind":"deployments","namespace":"prod","name":"${repo}"}' \\
        //          "http://157.90.94.185:18060/kuboard-api/cluster/pro/kind/CICDApi/admin/resource/restartWorkload"`)
        //      }
        //      if (env === 'production') {
        //          await runCommand(
        //              `
        // curl -X PUT \
        //  -H "Content-Type: application/yaml" \
        //  -H "Cookie: KuboardUsername=admin; KuboardAccessKey=s8tmhz5zx8yt.774t775zwaz3mwd6e86dws6xczdzdjdi" \
        //  -d '{"kind":"deployments","namespace":"prod","name":"${repo}"}' \
        //  "http://47.76.179.31:18060/kuboard-api/cluster/pro-hk/kind/CICDApi/admin/resource/restartWorkload"
        //          `
        //          )
        //      }


    } catch (error) {
        console.error(error);
    }
};

await execute();


// await exec(`docker build -t ${registry}/proreg/${repo}:${version} --build-arg REPO=${repo} -f Dockerfile-${cat} . `, (error, stdout, stderr) => {
//     console.log(stdout);
//     console.error(stderr, error);
// })
// await exec(`echo pro@Registry | docker login --username tongxurt丶 --password-stdin ${registry}`, (error, stdout, stderr) => {
//     console.log(stdout);
//     console.error(stderr, error);
// })
// await exec(`docker push ${registry}/proreg/${repo}:${version}`, (error, stdout, stderr) => {
//     console.log(stdout);
//     console.error(stderr, error);
// })


// function build() {
//     exec(`yarn install && yarn build:${repo}:${env}`, (error, stdout, stderr) => {
//         console.error(stderr, error);
//         console.log(stdout);
//     });
// }
//
// // console.log(`docker build -t ${registry}/proreg/${repo}:${version} --build-arg REPO=${repo} -f Dockerfile-${cat} .`)
//
// function dockerBuild() {
//     exec(`docker build -t ${registry}/proreg/${repo}:${version} --build-arg REPO=${repo} -f Dockerfile-${cat} ../`, (error, stdout, stderr) => {
//         console.error(stderr, error);
//         console.log(stdout);
//     });
// }
//
// function dockerDeploy() {
//     exec(`echo pro@Registry | docker login --username tongxurt丶 --password-stdin ${registry} && docker push ${registry}/proreg/${repo}:${version}`, (error, stdout, stderr) => {
//         console.error(stderr, error);
//         console.log(stdout);
//     })
// }

// await build()
// dockerBuild()
// dockerDeploy()

