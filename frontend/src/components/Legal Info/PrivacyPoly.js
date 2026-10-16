import React, {useEffect} from "react";
import { Container, Row } from "reactstrap";
import { Breadcrumb } from "../BreadCrumb";
import { StaggeredText } from "../Animations";

function PrivacyPoly () {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []); 

    return (
        <Container style={{ maxWidth: "90%" }}>
            <Row>
                <Breadcrumb items={[
                    { link: '/home', active: false },
                    { name: "", link: '', active: true }
                ]} />   
            </Row>
            <Container className="pb-5">
                <div className="d-flex justify-content-center pb-4 mt-4">
                    <h1 className="text-bold text-center"><StaggeredText text={"Privacy Policy"} /></h1>
                </div>
                <p className="pb-2">We expect you to carefully go through this Privacy Policy before using www.velourabd.com. Here, “We”, “Us”, “Our”, “Website”, “Site”, “System”, “Platforms” includes (All Social Media, Wearable Technology) will refer to VELOURA and “You”, “Your”, “User” will refer to Customers and Visitors.</p>
                <p className="pb-2">We are committed to providing the highest level of privacy protection for all of our customers. This privacy policy helps you understand the range of information we might collect from you upon your visit to the website and its subpages. This page also clarifies how we may use and process information from the choices you make when using the site.</p>
                <h3>Regarding the Information Collected</h3>
                <p className="pb-2">
                    When you visit the website and its subpages, use our services, place an order, make a purchase or contact us, we collect your identifiable information, for example, your name, phone number, email address, etc. Please be informed that we also keep records of your browsing history and interests to enhance your user experience on our site.
                </p>
                <h3>Personal Identification Information (PII)</h3>
                <p className="pb-2">
                    We may adopt several ways to gather PII from users. The following occasions might include: when you visit the site or platforms and perform certain activities such as filling out forms, registering, using the site’s services, resources, or features we make available on it. You may be requested to share your email address. You also have the option to visit the site anonymously. We might collect your PII only if you deliberately submit such kind of information. Please note that you can always avoid providing PII unless that might obstruct you from engaging in certain activities on the site.
                </p>
                <h3>Non-Personal Identification Information</h3>
                <p className="pb-2">
                    We may also collect your non-personal identification information when you interact with the site or platforms. Here, the non-personal identification information may include browser information, computer specification, and other related technical information as to how you connect to the site and platforms, for instance, the Internet Service Provider (ISP), the Operating System (OS), or other similar information.
                </p>
                <h3>Browser Cookies</h3>
                <p className="pb-2">
                    Cookies are bits of information that a website collects about the web browser and user preferences and saves them on the computer’s hard disk to create a customized user experience. Our site and platforms may also use cookies for the same purpose. You can always set your web browser to reject cookies or notify you when cookies are being sent. If you do not allow your browser to accept cookies or manually stop them from being saved, the site or platforms will not be able to offer you a personalized user experience.
                </p>
                <h3>How do we use the Collected Information?</h3>
                <p className="pb-2">
                    Improve customer service: Any information that you may provide us with helps us respond to your customer service support requests more efficiently.

                    To run a survey, promotion, or other features of the Site: The information that you send to us to receive services will help us offer you an optimized user experience.
                </p> 
                <h3>Your Information and Our Promise</h3>
                <p className="pb-2">
                    We prioritize the privacy and security of customers’ personal information. We adopt some of the most secure and technologically advanced storage systems, data collection methods, and processing practices and take tight security measures to protect our site and platforms against unauthorized or illegal access, disclosure, alteration, or destruction of Users’ passwords, personal information, usernames, and transaction information stored on the site and platforms.
                </p>
                <h3>Sharing our Users’ Personal Information</h3>
                <p className="pb-2"> 
                    We never sell, trade, or rent our users’ PII to any third party or other. However, we may share generic aggregated demographic information that is not linked to any PII or whatsoever about visitors or users with any of our business partners, advertisers or trusted affiliates for the purposes stated above. Please note that we may occasionally need to use third-party services to operate certain aspects of our business and administer activities from our end, such as monetary transactions, sending out newsletters, or surveys. In that case, we might have to share the site’s users’ information with these third parties to ensure certain services provided that the visitors of the site have permitted us to do so.
                </p>
                <h3>Modification</h3>
                <p>
                    We reserve the right to modify, extend or bring any updates to this privacy policy at any time without prior notice. Upon bringing an update, we will put the updated date at the bottom of the page. Users are requested to visit this page frequently to remain informed about any changes as to how and in what manner we protect the personal information that we collect from our users. You agree and acknowledge that it falls into your responsibility to check this privacy policy frequently and remain informed about modifications.
                </p>
                <h3>Your Acceptance of these Terms</h3>
                <p>
                    You consciously accept the Privacy Policy of the site and platforms by using it all the time. If you do not wish to give consent to any or all terms of this Privacy Policy, please stop using this website immediately. Your continued use of the site and platform, even after changes being made to this policy, will be regarded as your acceptance of these modifications.
                </p>    
            </Container>                  
        </Container>
    )
}

export default PrivacyPoly;