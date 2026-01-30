"use client";
import React from "react";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { Flex } from "antd";

export default function Terms() {
    return (
        <>
            <Flex style={{ paddingInline: 30, paddingBlock: 10 }}>
                <Logo />
            </Flex>
            <div className="legal-container">
                <div className="content-block">
                    <div className="title">Terms of Service</div>
                    <div className="time">Last Updated: 2023-08-01</div>
                    <p>
                        Please note that your use of and access to our services (defined below) are subject to the
                        following terms; if you do not agree to all of the following, you may not use or access the
                        services in any manner.
                    </p>
                    <p>
                        These Terms of Use (the "Terms") are a binding contract between you and XTips ("XTips", "we" and
                        "us"). If you have any questions, comments, or concerns regarding these Terms or the Services,
                        please contact us at <a href="mailto:service@xtips.ai">service@xtips.ai</a>.
                    </p>
                    <p>
                        You must agree to and accept all of the Terms, or you don't have the right to use the Services.
                        Your using the Services in any way means that you agree to all of these Terms, and these Terms
                        will remain in effect while you use the services. These Terms include the provisions in this
                        document, as well as those in the Privacy Policy.
                    </p>
                </div>
                <div className="content-block">
                    <div className="font-bold text-2xl">Will these Terms ever change?</div>
                    <p>
                        We are constantly improving our Services, so these Terms may need to change along with the
                        Services. We reserve the right to change the Terms at any time, but if we do, we will bring it
                        to your attention by placing a notice on the XTips website, and/or by sending you an email,
                        and/or by some other means.
                    </p>
                    <p>
                        If you don’t agree with the new Terms, you are free to reject them; unfortunately, that means
                        you will no longer be able to use the Services. If you use the Services in any way after a
                        change to the Terms is effective, that means you agree to all of the changes.
                    </p>
                </div>
                <div className="content-block">
                    <div className="font-bold text-2xl">General Philosophy</div>
                    <p>
                        We strive to make XTips as easy-to-use as possible and as ethical a business operation as
                        possible. The terms will ensure a good experience for you, our users, and us, the creators of
                        XTips. You must agree to these terms before using XTips.
                    </p>
                </div>
                <div className="content-block">
                    <div className="font-bold text-2xl">Content</div>
                    <p>
                        You understand and agree that the content and information you use on the XTips Services are your
                        responsibility. You represent that you either own or have the necessary rights and permissions
                        to use the content and information you make available through the Services. You agree that you
                        will not use the Services to upload, post, transmit, or otherwise make available any content
                        that:
                    </p>
                    <ul>
                        <li>
                            Infringes any patent, trademark, trade secret, copyright, or other proprietary rights of any
                            party;
                        </li>
                        <li>Is fraudulent, false, misleading, or deceptive;</li>
                        <li>Is defamatory, obscene, pornographic, vulgar, or offensive;</li>
                        <li>
                            Promotes discrimination, bigotry, racism, hatred, harassment, or harm against any individual
                            or group;
                        </li>
                        <li>
                            Is violent or threatening or promotes violence or actions that are threatening to any other
                            person;
                        </li>
                        <li>Promotes illegal or harmful activities or substances;</li>
                        <p>
                            XTips reserves the right to remove any content or information you make available through the
                            Services if it believes it violates these Terms.
                        </p>
                    </ul>
                </div>
                <div className="content-block">
                    <div className="font-bold text-2xl">Warranties and Disclaimers</div>
                    <p>
                        THE SYLVIA SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE” AND WITHOUT WARRANTIES OF ANY KIND
                        EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS
                        FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                    </p>
                    <p>
                        SYLVIA DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, AND SYLVIA DOES
                        NOT WARRANT THAT ANY ERRORS WILL BE CORRECTED. SYLVIA DISCLAIMS ANY AND ALL LIABILITY FOR THE
                        ACTS, OMISSIONS, AND CONDUCT OF ANY THIRD PARTIES IN CONNECTION WITH OR RELATED TO YOUR USE OF
                        THE SERVICES.
                    </p>
                    <p>
                        YOU ASSUME TOTAL RESPONSIBILITY FOR YOUR USE OF THE SERVICES AND YOUR RELIANCE THEREON. YOUR USE
                        OF THE SERVICES IS AT YOUR OWN RISK.
                    </p>
                </div>
                <div className="content-block">
                    <div className="font-bold text-2xl">Liability Limitation</div>
                    <p>
                        SYLVIA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY
                        DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER
                        INTANGIBLE LOSSES (EVEN IF SYLVIA HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES),
                        RESULTING FROM YOUR USE OF THE SERVICES.
                    </p>
                    <p>
                        THE TOTAL LIABILITY OF SYLVIA FOR ALL CLAIMS ARISING FROM OR RELATING TO THE USE OF THE SERVICES
                        IS LIMITED TO THE AMOUNT, IF ANY, ACTUALLY PAID BY YOU FOR USE OF THE SERVICES DURING THE 12
                        MONTHS IMMEDIATELY PRECEDING THE DATE THE CLAIM AROSE.
                    </p>
                </div>
                <div className="content-block">
                    <div className="font-bold text-2xl">Miscellaneous</div>
                    <p>
                        These Terms and the relationship between you and XTips shall be governed by the laws of the
                        State of California without regard to its conflict of law provisions. You and XTips agree to
                        submit to the personal jurisdiction of a state court located in Santa Clara County, California
                        or the United States District Court for the Northern District of California.
                    </p>
                    <p>
                        If any provision of these Terms is found to be invalid or unenforceable, the remaining
                        provisions shall be enforced to the fullest extent possible, and the remaining Terms shall
                        remain in full force and effect.
                    </p>
                    <p>
                        These Terms constitute the entire agreement between you and XTips with respect to the use of the
                        Services and supersedes all prior or contemporaneous communications, understandings, and
                        agreements, whether written or oral, between you and XTips.
                    </p>
                </div>
            </div>
            {/* <Footer/> */}
        </>
    );
}
