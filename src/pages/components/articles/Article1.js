import React from 'react'
import { Button } from 'antd';

const Article1 = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlname = queryParams.get("url");

    return (
        <div align="left">
            When you got your eCommerce Website (Clavstore Platform), you've been given a subdomain as your URL or link.
            <br /><br />
            In your case, you have <b>https://{urlname}.clavstore.com</b>
            <br /><br />
            Subdomains are free but you need to have a domain first before you can create it, sadly domain are not free. You have to pay it in a yearly basis.
            <br /><br />
            Luckily, we already have the domain <b>clavstore.com</b> that's why we can give you a subdomain for your website without any additional cost.
            <br /><br />
            However, there are a lot of cons when using subdomains.
            <br /><br />
            1. <b>You may loose Your Whole Website.</b> Simply, if our main domain <b>clavstore.com</b> goes down for whatever reason. Your website (which is a subdomain) goes down as well.
            <br /><br />
            Reasons Main Domain Go Shutdown:
            <br /><br />
                <ul>
                    <li>
                        <b>Complaint about illegal posting of trademark products to one of our Clavstore user.</b> We can't control other Clavstore user what products are they posting on thier websites.
                        If a product has a copyright issue, the owner of that certain products may file a complaint to the domain registrant of clavstore.com. And since this registrant are the
                        one who provided us the domain name then they also have the right to shut it down anytime. If this happens, your website which has a subdomain under clavstore.com also goes down.
                    </li>
                    <li>
                        <b>Cyber Attack.</b> Even the most secure website such as Facebook and Google experienced cyber attacks. Remember that they employ the best programmer in the
                        world but still they have been attacked and was shut down. And that goes as well with own clavstore.com, but if you have a separate domain for your website, you 
                        will be excluded from any attacks on our clavstore.com.
                    </li>
                    <li>
                        <b>Hosting Maintenance and Other Interruptions.</b> The hosting provider of our domain regularly performs server maintenance and worst there are some interruptions happens
                        along the way due to overloading of its servers. This happens when many customers are ordering in all of our Clavstore users. Interruption may last for an hour, a day,
                        and in some cases, weeks. But if you have a separate domain name for your website, you will be excluded from these scenarios.
                    </li>
                </ul>
            2. <b>Banning of URL is Inevitable For Affiliate Program.</b> If you are participating in our Affiliate Program, you are sharing your affiliate link to Facebook and other social media
            to get referrals and propect.
            <br /><br />
            Doing this needs you to understand that if your affiliate link is just a subdomain and the main domain was banned, from Facebook or other social media, your subdomain will also automatically banned.
            <br /><br />
            The main domain usually got banned due to unethical use of subdomains of other affiliate marketers. Unluckilly, we don't have a control for these. Thus, having a dedicated 
            domain for your website will separate you from them and makes you free from banning.
            <br /><br />
            <b>Question.</b> How can you upgrade your website to have a separate domain name?
            <br /><br />
            Well, I have promised you that there will be no hidden charges when using the Clavstore platform. You only need to pay the one time setup fee and the monthly hosting fee (subscription fee).
            <br /><br />
            Since domain names are not for free and they have to be paid in a yearly basis, we are giving you this offer.
            <br /><br />
            All you need to do is to pay your one year subscription fee and we will upgrade your subdomain <b>https://{urlname}.clavstore.com</b> to <b>https://{urlname}.com</b> or to whatever domain you like as long as it is still available in the market.
            <br /><br />
            <b>Question.</b> What if I have remaining months for my subscription?
            <br /><br />
            No worries because we will add the 1 year subscription on top of your existing remaining subscription. Example, if you have 1 month left then you will have a total of 13 months
            remaining subscription after availing the offer.
            <br /><br />
            To upgrade your link to a domain name, go to your website's admin account and proceed to <b>Subscription</b> menu, on the <b>Choose Payment Plan</b> select <b>$6/mo for 1 year = $72</b>.
            <br /><br />
            <div align="center">
                <Button type="primary" shape="round" size="large" onClick={() => window.open(`https://${urlname}.clavstore.com/admin/subscription`, "_blank").focus()}>
                    Go To Your Admin Account HERE
                </Button>
            </div>
        </div>
    );
}
 
export default Article1;