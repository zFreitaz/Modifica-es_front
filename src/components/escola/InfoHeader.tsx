import React from "react";
import logo from "../../assets/logo.svg"

interface InfoHeaderProps{
    icon: React.ReactNode
    title: string
    subtitle: string
}

export default function InfoHeader({
    icon, title, subtitle
} : InfoHeaderProps){
        return(
            <div className="infoHeader">
                    <div className="TitleInformations">
                        <div className="infoHeaderIcon">
                            {icon}
                        </div>

                        <div className="infoHeaderText">
                            <h2 className="infoHeaderTitle">
                                {title}
                            </h2>

                            <p className="infoHeaderSubtitle">
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="LogoHeader">
                        <img src={logo} alt="" />
                    </div>
            </div>
        )
    }