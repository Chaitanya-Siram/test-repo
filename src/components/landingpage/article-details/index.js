import React, { useEffect } from 'react';
import ArticleDes from '../../../assets/img/article-des-image.png'
import Header from '../header';
import Footer from '../footer';
import './index.css';


const ArticleDetails = () => {

    const articleDetails = JSON.parse(localStorage.getItem('articleDetailsObj'));

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [articleDetails])

    return (
        <div>
            {articleDetails?.articleCategory === 'Press Release' &&
                <div className='private-article'>
                    <div className='private-article-header'>
                        <Header />
                        <h5 className='article-head'>{articleDetails?.category}</h5>
                    </div>
                    <div className='article-content-container'>
                        <div className='article-wrapper'>
                            <h2 className='article-heading'>
                                InfoVision Inc. Launches AlphametricX for AI-Powered Media Intelligence
                            </h2>
                            <p className='article-details-date'>
                                {articleDetails?.date}
                            </p>
                            <p className='article-main-text'>
                                Business leaders today need almost real-time intelligence from traditional media and social media to make data-driven strategic decisions faster. However, this need is not being met since their media and analytics teams work with disjointed datasets which have low accuracy and relevance. These teams spend a lot of time in data clean-up and then harmonizing them.
                            </p>
                            {/* <img className='article-des-logo' src={ArticleDes} alt='article-des-logo' /> */}
                            <p className='article-text'>
                                AlphametricX addresses these issues by delivering highly accurate and near real-time integrated media intelligence. The accuracy and efficiency of AlphametricX is powered by AI and ML stacks to help busy teams manage their time and productivity. The tool also harmonizes disjointed datasets across multiple regions and audiences to create a more holistic view of the brand.
                            </p>
                            <p className='article-text'>
                                “As a company, we have always been passionate about identifying new ways of doing things and disrupting the status quo. We believe AlphametricX will help us do exactly that. It will disrupt the field of media listening, influencer and media dataset, and analytics while increasing end-to-end efficiencies”, said Rajesh Kari, Vice President, Business Leader at InfoVision Inc.
                            </p>
                            <p className='article-text'>
                                AlphametricX is available as a SaaS product under monthly subscription packages. InfoVision Inc. is also offering a customized trial of the tool with an easy cancellation policy
                            </p>
                            <p className='article-text'>
                                “While other tool companies are providing a pre-fixed trials, we are doing more customized trials to let different teams get the real flavor of our platform’s capabilities. Whether it is corporate PR team, research and insights department, social media and marketing, or PR agencies – everyone gets a trial that they can customize based on their needs,” informed Mr. Kari.
                            </p>
                            <p className='article-text'>
                                To know more about AllphametricX visit <a href='https://www.alphametricx.com./' target='blank'>www.alphametricx.com.</a>
                            </p>
                        </div>
                    </div>
                </div>
            }
            {
                articleDetails?.articleCategory?.includes('Corporate Communications') &&
                <div className='private-article'>
                    <div className='private-article-header'>
                        <Header />
                        <h5 className='article-head'>{articleDetails?.category}</h5>
                    </div>
                    <div className='article-content-container'>
                        <div className='article-wrapper'>
                            <h2 className='article-heading'>
                                Media Listening Tools and the Changing Role of Corporate Communications
                            </h2>
                            <p className='article-details-date'>
                                {articleDetails?.date}
                            </p>
                            <p className='article-main-text'>
                                In the post pandemic world, the role of corporate communications has become all the more important. They are no longer in the reporting role and have assumed a more advisory role. At the same time, the corporate communications is expected to stay agile in an ever-changing business environment affected by social, political, economic scenarios.
                            </p>
                            <p className='article-text'>
                                If that is the case, then the tools and products supporting corporate communications also need to evolve.
                            </p>
                        </div>
                        <div className='article-wrapper'>
                            <li className='article-sub-heading'> Convergence of Channels & Content</li>
                            <p className='article-text'>
                                Corporate PR teams today use a variety of channels for content dissemination. Targeted communications cross-pollinate from one channel to another and campaign messages have a very hybrid journey map. Tracking brand stories and quantifying impact of PR efforts within such hybrid spaces can be daunting. Tools that do not accommodate such channel and content convergence may not really meet the needs of corporate communications teams any more.
                            </p>
                            <p className='article-text'>
                                AlphametricX – an advanced media intelligence tool will provide this convergence of channels and content. Users will be able to access data from traditional media, social media, digital media, etc. to support comprehensive media monitoring and measurement.
                            </p>
                        </div>
                        <div className='article-wrapper'>
                            <li className='article-sub-heading'> PR Insights</li>
                            <p className='article-text'>
                                The modern day corporate PR teams rely on data-backed insights to drive their strategies. Better quality of insights would make their strategies more effective. However, many tools still provide very basic level of insights which are not business relevant.
                            </p>
                            <p className='article-text'>
                                With AlphametricX we want to empower corporate PR teams with intelligent insights that are actionable and business relevant. With other tools, the PR teams apply lot of human effort and interventions to uncover real valuable insights. But in AlphametricX, this extent of human intervention will be minimized.
                            </p>
                        </div>
                        <div className='article-wrapper'>
                            <li className='article-sub-heading'> Advanced Metrics</li>
                            <p className='article-text'>
                                The increasing focus on data-driven communications has pushed corporate PR teams to look beyond the traditional success metrics. There is a shift in how the PR teams quantify the impact of their strategies and portray the success. The current tools allow fundamental level of customizations that can hardly accommodate custom metrics
                            </p>
                            <p className='article-text'>
                                AlphametricX is being developed to cater to this need of customization. The users will be able to create their own dashboards, use their own performance KPIs, and measure success against objectives. The users will be able to personalize their experience with the tool and make it their personal workspace
                            </p>
                        </div>
                        <div className='article-wrapper'>
                            <h3 className='article-final-heading'>Future of Corporate Communications</h3>
                            <p className='article-text'>Data and insights will shape the future of corporate communications. The PR teams will have to adapt to devolving data sources and the complexity of data. This data then needs to be understood and analyzed within the context of the business ecosystem. A tool that can give better accuracy in data pull, intelligent insights, and freedom of dashboard customization will only empower corporate communications.</p>
                        </div>
                    </div>
                </div>
            }
            {
                articleDetails?.articleCategory?.includes('Monitoring Teams') &&
                <div className='private-article'>
                    <div className='private-article-header'>
                        <Header />
                        <h5 className='article-head'>{articleDetails?.category}</h5>
                    </div>
                    <div className='article-content-container'>
                        <div className='article-wrapper'>
                            <h2 className='article-heading'>
                                Challenges of Media Monitoring and Addressing Them through AlphametricX
                            </h2>
                            <p className='article-details-date'>
                                {articleDetails?.date}
                            </p>
                            <p className='article-main-text'>
                                Media monitoring is a very crucial part of public relations. Almost every public relations agency, boutique communications agency or even corporate communications team relies on listening to the media chatter also known as media monitoring on a daily basis. They have a certain percentage of their resources allocated to media monitoring. The success of their strategies and practices also depend a lot on this media monitoring.
                            </p>
                            <p className='article-text'>
                                So it becomes imperative to improve the quality of media monitoring by addressing the challenges that this function faces. That is what AlphametricX – the most advanced media listening tool being developed right now would do.
                            </p>
                            <p className='article-text'>
                                So what challenges are we focused on in the first phase of AlphametricX rollout?
                            </p>
                        </div>
                        <div className='article-wrapper'>
                            <li className='article-sub-heading'>Challenge 1: Accuracy of Data</li>
                            <p className='article-text'>
                                Media monitoring teams depend on the data output given by the media monitoring tools that they have invested in. They set up the Boolean queries and extract the data output to work with. However, the accuracy of the data is still a challenge. Many media monitoring teams spend hours trying to clean up the noise or spam that gets captured by the current tools.
                            </p>
                            <p className='article-text'>
                                We are developing an advanced AI algorithm that would improve the accuracy of the data for the media monitoring teams and reduce their manual efforts. AlphametricX would be an advanced media monitoring tool that would offer {'>'} 90% accuracy in data output
                            </p>
                            <p className='article-text'>
                                The data would also have a very high percentage of relevance – ensured by our AI and ML stacks in the back-end.
                            </p>
                        </div>
                        <div className='article-wrapper'>
                            <li className='article-sub-heading'> Challenge 2: Insights</li>
                            <p className='article-text'>
                                Strategies are made based on insights and not merely reports. A lot of PR teams need actionable insights from the media listening datasets. However, this is where the current tools in the market are not really matching the expectations.
                            </p>
                            <p className='article-text'>
                                In addition to media listening, AlphametricX will also be one of the most advanced media analytics tool. It would offer intelligent insights to the media monitoring teams on their dashboard itself. These insights can then be shared by the media monitoring teams with the relevant stakeholders for their strategy-making.
                            </p>
                        </div>
                        <div className='article-wrapper'>
                            <li className='article-sub-heading'>Challenge 3: Customizability</li>
                            <p className='article-text'>
                                Many media listening tools have a very pre-defined user interface that leaves very limited scope for customization. The tool users find it very difficult to customize the way the information is presented in these tools. They can’t have their own sequence for information display, can’t customize the charts and graphs easily, etc. AlphametricX would be changing this status quo.
                            </p>
                            <p className='article-text'>
                                In AlphametricX, the users will have freedom to personalize the user interface and make the tool their personal workspace. They would be able to set their own dashboards and information sequence based on
                                their needs. They would also be able to create their own graphs and charts to help them through certain business relevant questions.
                            </p>
                        </div>
                        <div className='article-wrapper'>
                            <h3 className='article-final-heading'>Conclusion</h3>
                            <p className='article-text'>
                                In addition to these, AlphametricX will also focus on reducing the human effort involved in media monitoring, improve the productivity of teams by automating report creation, and directly impact the efficiency of strategy decisions
                            </p>
                            <p className='article-text'>
                                Watch out for more news around the launch of AlphametricX and the exclusive tool demos that will soon be set up.
                            </p>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </div >
    );
}

export default ArticleDetails;
