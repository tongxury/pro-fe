import {exec} from 'child_process';

// 获取命令行参数
const args = process.argv.slice(2);
const [version] = args;

const registryTag = `usernx/next-env:${version}`

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
        //
        await runCommand(`docker build -t ${registryTag} -f Dockerfile-next-dev . `)
        await runCommand(`docker push ${registryTag}`)

    } catch (error) {
        console.error(error);
    }
};

await execute();
