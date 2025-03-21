import { Link } from "react-router";
import { memo } from "react";

interface FooterProps {
    content: string;
    link: string;
    linkText: string;
}

const Footer = ({ content, link, linkText }: FooterProps) => {
    return (
        <small className="mt-2">
            {content} <Link to={link}>{linkText}</Link>
        </small>
    )
}

export default memo(Footer);