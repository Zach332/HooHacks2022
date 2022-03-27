import Deso from 'deso-protocol';
const deso = new Deso();

export async function login() {
    const response = await deso.identity.login(3)
    console.log(response)
    // const request = {
    //     "UpdaterPublicKeyBase58Check": null,
    //     "BodyObj": {
    //       "Body": `I scored ${global.correct}/10 on Conguess! How much do you know about your elected representatives? https://zach332.github.io`,
    //       "VideoURLs": [],
    //       "ImageURLs": []
    //     }
    // }
    // const postResponse = await deso.posts.submitPost(request)
    // console.log(postResponse)
}
