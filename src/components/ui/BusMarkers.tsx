import { useEffect, useState } from "react";
import { MovingMarker } from "@/components/ui/MovingMarker.tsx";
import { fetch_buses_coords, Route } from "@/lib/wraps/burgasBus.ts";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import BusDynamicSVG from "@/components/svg/BusDynamicSVG.tsx";

const getBusIcon = (route: Route, className?: string) => {
    return divIcon({
        html: `${renderToStaticMarkup(<BusDynamicSVG color={route.color} text={route.shortName} textColor={route.textColor} className={className}/>)}`,
        className: ''
    })
}

export const BusMarkers = () => {
    const [routes, setRoutes] = useState<Route[]>([]);
    // const examplePoly = useMemo(() => decodePolyline("u_jbGswtfDfAMr@hOZnGXzFTnEBjDG`AOjBOlBKzAc@vEa@rCa@fB]dAk@bAw@`Aq@l@SN}@^u@Pm@Dy@@}CHuIlBwBb@o@Nw@Py@Ni@JuAXy@XqAZsFnA{@NkCj@uCn@q@LyGtAcBViCd@aFbAWFC?aAPiAX_ATcBr@uAt@u@d@gAdAs@x@kAdBe@~@y@pBiBjG}CzK}AtFe@fBQh@uBxH[dAsBxHwAbFGTmAhEK^oA|Ew@hD{@`EaAlEk@nCo@bDaAxEWzA[fBw@bHE`@mAhL}@hJgBbR[fDcAxJCTk@fGSvBcA`KSrB}@vJa@`EUtB_@lD]pDAJObBa@tEs@dHe@xESpBO~AO~ACPE`@O|AAFKvAKpAc@dIMpDEnAKbCGpAEhBAtAAhB@vAFlBD|@@\\HhA\\rCJt@XzAj@nCz@xClCpHl@|AlAfDz@bChAjDZhAd@nBb@vBHf@?@T`BR`Bl@rGdBfRv@fIRtBNvAr@bIFj@LpA`@|DPlAPhALn@bBzHPv@Nl@h@`CZxAf@fC\\zBXhCBTVzEDzC@VIdFKjBKnAMrAMbAM~@UlAQ`A[pAu@`C[bAADGRa@pAg@hBGPK`@mBjGmBfGwAnEcC|HY|@aAxCc@jAuA`DqAjCM\\}@hBi@hAg@dAuArCiAbCy@|Ay@tAw@jAw@bAwA`BqCpCiMjLQNmOjN{LbLyOxN_O|M{K~JaA|@gB`BqFhFwI~HqMrL}DnDmHxGsCpCaInHcA|@qAjAyGbGeGtFuCrBwBdAoEhBsBt@qFlBiBn@cCz@_D|@{Bv@sAr@uFvB{FjBUHiGvBcCt@s@HiBl@uBXoFdBu@VkDnAeDlAuJhDo@Tg`@hMic@|NqJ`DcFbBsKrDcF`BmBn@gJ`DoHbC{FnB}Bn@a@LeBl@MDoAb@mA`@sIxC}Bv@}Al@m@VYLYNc@Vs@`@g@\\e@^]Z]Zk@j@}CjDMLuA`B]^WZ[`@{@bAaClC_@`@yApASLoAz@OHu@b@sAj@sAj@s@Tc@PwBv@MDaDjAoCbAyBv@MDqKxDmCbAa@PWHaHfCwFrBqCbAeE|AmDlAmBt@a@NeKtDwBx@a@N{@^y@ZQHc@T{DvBcAj@uC~A}D|BOHWLkB|@i@VYLYNQF{ClAmHdBuATsCf@K@QDUBwE^q@DYBQ?qBFcB?[?u@?i@Ae@CeBEq@EkBM}AImCMeEQ{@C}GCO@cDHM@S@I@Q@U@_@D[BUD}AP]FWBUDi@Ha@Fc@Fc@Jk@JUFYFYHe@Lm@Po@TuBp@eCbAQFsAj@a@Rc@Tg@Vw@`@u@b@aBbAiBtACBsCtBaEvD}A`BgAjAiChDeEfFuAdBeDlDm@p@[^i@f@w@p@w@p@a@XCBqEfD}AbAgB|@gBv@_@P}DbBaGtBiItCiFtB}BnAyAr@_CtAuBrAyA~@A@_@V_BbA}AdA{A`AsBrAu@f@g@ZyAbAoBnAkBlAsGbE}BxAuA|@wBvAs@d@s@d@kDzByBvAoBnAoBnAsAx@[TcIvEkO|JoD~BoG~DqJdGi@\\_BdAuA~@WN_CzA}@l@cGvDiUrNcFhCwEvBgAh@wJfEkG~BaBl@oIzCGBqZdLuGxB}DpAA?a@PuAl@m@\\mBnAaAz@IFaA`AkAvAiArA_@l@ILo@fAa@r@a@|@KVa@hAk@bBi@dBa@`BCHi@rBMlAKrAADGlAItAKzAMbBOlBObBK`BYdCObBIt@QtAYbBQ`AsDfMiCzFkCpGk@rAc@~AER[jAUhAk@vC[hCw@rFc@rCYxAMl@qB|G{FvPs@rB}AjE_FpOGZkChQiFh^aAlISvFCzGNfG`@|GbCxTPlD@NHtB@ZDpBBp@?DCbBGhC?Fg@tEo@nEgAjEsB`G_C|FuChHmFhMiNv^}DxJuJfVqB`FsIdTsGjQ{BbG_EjKsB|Go@|B_@~Ai@rCAFWfBQ`BQnCKdCA`D@rCTfGlAjRvAvUjAbSb@xGDt@`AzOVbEHjA^dDZpB`@`CJh@Nt@~@vD~BrIrBlH`@xAnBhHbCjJvB|HnEjP~BpIjAlEz@xCXjAt@|Ch@|BTvATdBNnATnBLhC@r@@bB?dACdCA\\KjBQzCEh@yA`POxAg@`F_@vEIpAKnCGdB?bCBpCNlDD~@\\zDPrA^bCr@bEvBdMTtA|@nFBPr@tDvAvHLx@pAvI`ApF|AbJl@lDrAnHbBtJ^xBxB|LdAnG`AlEb@bBpA`EBHnAlDxAbDxDnHnAdBtBlCbMzMbCdCzHpIvB~BfAjAjBjBvJfKjFpFp@v@xE~EtBzBtD~Dd@n@vAhB`BtCrAvChAfDX~@dBlJtAlIhA~Gz@jF\\dBnAfHp@rDjAfHjApGV~AfChOnBdLlArFp@`CbApCfAjCr@`BlApCzAfDVn@h@nAN\\bA`CDJx@hBTj@f@jA|ChHhIbRpAxCnJjTJVpGxNvHdQ`KrU`CrFTf@xFtMnDjI~BlFP^^x@FJ^z@zAhDtB~ErAvCvAfD`EhJlDvHfAbC~BlFhCbGrAzCv@fBrAtCfC~F`BnDb@`Aj@pAz@lBx@jBfB`E`AzBpAvC|@nBDHnCnGnCzF@BRXbAxANTP\\N\\pAxCfAhCz@nBf@fAp@zANf@L`@J^Jh@H\\Pp@r@~ARb@h@nAb@bAx@nB`AnCRp@^pAh@lCVzA^jCR`Cb@|FNvB`AxMr@fKBn@HvBDnBFlDBjEAlCE~GC~CIpE?rCGzGCpDE|EAlC?XCtFQnGc@jF_@nCoBlOu@vFS~CE`C@zB?dAFtDJlBPnB|@hG~@bEr@fCVl@h@fAHPr@rAlA`B`CzCbC~C|CtDxGjJhC`Ez@|An@|A^fA^jA@BZtAz@lDj@|DRvBVpCPrEJzDL~GFjCPbEJ`CZrCZ`C^nBb@hBl@nBx@fCVp@^fBXv@\\t@Xj@T^Z`@x@fA^f@`AhAJJ~@x@vB|AvAdAxEbD~EnChC`B\\RxAbArBbBtBrBpC~C^b@tBfCnB`CtA~AlBvB`BnB^d@rChDhC~CnAxAz@hADHr@fAz@~Al@nAd@bA|AtEvAlEfAfDn@bBl@tAP`@tAbCd@r@f@t@bAnAv@v@~@z@r@l@`Ap@pAz@`B`AtBnApBjA~@t@|BrBnAzAj@r@dA`Bx@zAfA`Cr@pB@Bv@jCZtAN|@Jr@Hj@R~AZrBTpBNhAPtAXzBZ`CZjCVtBZ|BTtBZzBTfB\\bC^vCThB`@|CXbC^vCZbCVxBR~A^jCVtBXtBPxAZhCVxBNbABVR|AXpBRbB^nCTnBVlBRdBR|ANrA^nCPnANtANvANfAR~Af@zD^jCZjCTnBTjBTfBTlBZ~BNlATfB\\vBV`Br@`EZlBt@|Db@`Cf@fCPhAPbAVhA`@rBf@nCXxAb@rBTfA`@~A^`B`@|A`ApDr@jChApEd@lBl@~BRt@VdALj@^zA\\hAr@pCH^t@rCx@zCjAlEpAdFhAnE`@|AbAzDfAjEdAxDfAhEt@rCXhAp@hCz@nD^vA\\rAJ`@H\\Lt@\\bBLx@Jt@TdBFv@Hz@NvC@^BhA@X?V?b@@d@?j@CjBE~BQbEUfGKnCGzAGlBEbAAt@At@?n@AlABnADpBHvBNpBPdBHdAN~@XnBTpA\\zAXhAT~@bAvCz@|BTj@j@jAp@tApBfDlBbDHLjB~CfBzCbAdB|@xA^n@rApCj@lA^z@d@jA|@lCbAvCv@bCbAzCz@dC~@vCjAjDjAjDlAzDdAvCn@lBjAlD|@pC|@nC`ApCz@rCj@zBl@zBt@hDh@lCn@vD`@hCd@~D^pCv@fGh@zDz@xG|@pH`@xCx@pGp@rFj@nEr@hFh@`Fj@nDd@vDj@tEn@~E~@xHj@vEl@lEjAjJhAvIZhCj@dEl@vFZjDj@rITxFFbD?zAFtGArAEnBMlEIpBM`CUnDU|DUzDW|Da@hHc@vFKdBQtCUpEMpBa@jGEx@WvDa@|Fk@lJShDQxBOhCMvB[nFg@zH_@hGYfF]nFMnBK|DAfA@bFDtABj@HnBRnCJfATjBv@tFj@vEv@`G|@dGTtBh@rDjB`NZtBHt@rDlXVhBVhB\\tCHh@\\`C@HTfBBTHl@Hj@PhAL`ATzA^hCJr@@R@JV|AZvB?Bb@zCR|Af@jDTfBPpAz@nG^rCZvBL`ALjAHz@NtADx@FfAD~@@x@@pA?`B?fA?v@D`@A^?v@?JAv@[h]IpLMbOGnGI|JI`JGzI?r@IvHIfII`KGrGAhCEnIKfJ?FYz^QlSUr[O`T?fAAd@@f@?f@@n@Bv@BbAFtAFlAHdBJvAP|Bf@rEHv@\\~CRbBz@`I|@dIj@rFZrCX|Bf@nEx@xHz@bI@DdBpOnAhLXzBFn@r@dGpA~LFn@P|AJ`ADZFv@@FDn@@D^tDXtCn@zFf@fEz@dHV|BPp@z@tG@J~@xIFf@PzAN|AbC`U`@dFF`ATzB@d@?LV|B@JTvBX`DJfABTLpCDjA?pA?fAA~@CzAElA?BIrAQzBOjB{@pJU~CGdAIxBC|B?|EBrHDhIHjPJ`M@zEBxD@tCFzH?~BA~A?|@Cj@E|AEvAWfGKrBOzEa@xJUnFOjE_@~IObEMdCKvCSzF_@`GWxBw@bF_@vB_@rBsA|Hs@nEmAxG}AjJeA~FkAfHUxAcCvNiAxGSlAALiB~JmAbHcAnFa@pBgCjJaArDo@bCMb@oB~GkBbHoAtEeBfGwAlFcBbGaCvIW|@qBrHgD~LeBhGcAzDqAbFe@jBe@xBaAlE}AxHm@tCgBxIuBhKkAnFw@nDyBnKi@lCg@~BQbASz@_BvH]hBiAzFEXCPKn@AZAHALUxAWvAw@tDaA~EcAzEqDrPk@~AQr@Md@KZADELMl@GVETi@jC_@bBkClMoCrMe@~BQv@aCfL[tA}AhHWlAQx@On@e@~BS~@UhAWlAWnAKd@Op@GXKh@Mp@Qv@Ib@Mj@Kd@Ot@[rAKd@Id@Mj@Kf@Kh@Mj@Ml@Kf@Ml@Ov@WhAUhAKf@Mp@Mh@Ov@[rAUlAUdA[tAS`AUlAYpAMl@[|AOt@AFS~@Mj@Mn@Ot@Qx@YtAOt@Qt@SdAWjA_@hBS~@SfAWdAWpAQz@WjAQ~@UbA]bBa@fB]~Ai@lCOt@Sz@Ih@Qx@Sz@Mn@Or@S|@SdAWhAS~@Q|@UhASz@UfAOp@Qx@S|@S`AMp@S|@Q~@S|@Qz@S`Aa@nBQz@S|@Id@Kd@a@hBm@vCMj@S`Ak@jCOt@Q|@Sz@Kh@Mj@WpAOp@S~@Q|@S`Aa@hBc@zBQt@ABUjAMn@Qv@YnAQx@Q~@SdAc@nB[bBWnA]nB[fB_@zB]pBQfAQjAm@rDWxAQfA]tBa@bCo@rDs@xDa@hBi@pBY~@e@tA[|@i@tAeApCaAfCQf@Ul@g@rAa@bAa@dAm@bBw@tBo@~Am@~A[|@g@tAe@hAYr@o@dBSh@Sf@[z@[x@ELSf@c@hAm@bBUn@Yr@O`@Uj@Wr@]z@Sj@Qd@Sh@Sj@Wn@[x@]`ASd@[v@_@bASl@EJ]z@Wn@Yx@O^Qd@Sh@Uj@M\\Qd@Wr@e@lAUl@Sh@Qf@Sf@Uj@KTQh@e@nA]~@Yp@[|@c@jAk@vAiAzCwB|Fk@zAUn@{@zBUl@o@dBABUl@a@fAa@bAaAhCUl@KXo@dBWn@Yv@Ul@[x@Sj@m@~AUj@g@tASh@Sd@EHITOb@IRIRUl@Yt@Ob@Up@GNu@jBe@nAO^k@zAa@fAiAtC_BbEa@dAELUl@gAlCqAfDmA~CaClGiH~P{DrJSf@e@jAaH|P{@pBkBhEqA|BcAfBcBrCiGjJcJ`NuAzBaEbGY`@sDnFmEnGoBpCm@~@uApBsBxCABcDzEg@t@OR}BhD{@rAw@lA}@pAm@z@W^c@n@_@j@cAxAa@n@g@t@]f@S\\ORILe@x@m@hAUb@}@rBGNqA~CmGjPsBxFQf@Qh@K^CFAFId@If@G^CXEd@Cx@AvBAhD@D?lBGlA?PCz@BhBFfA@VDd@Hr@Jz@Hn@Pz@f@vBTv@Nj@lBrG|DdNN^\\dAHV~@zCX`ADLBLRn@Pp@BJDJj@pBHT|@~ChDtLJb@Rr@`@lAf@jBDNb@pALXPh@h@hAR^T^b@r@h@t@b@b@XZ`@\\DBXTXRd@X^PFDt@Xd@Nx@R\\Fh@Hx@JXBh@DbAJ|F^T@\\Dj@Ft@Jd@J\\JTDZHFBNDLDNFf@R^N^Pd@V`Al@HFFD`@^d@`@l@n@^b@\\d@T\\RZh@`A@BXh@P\\Zp@^~@Rn@Tv@Rr@Rx@Nt@`@rBZbB`@tBv@dEv@dELx@Jp@F^D^Df@B\\Dr@Bt@B^?Z@~@@dB@tABtMBjG@dD@zEA~@?t@AbAA|@Cz@Cx@Cx@Gr@InAGt@YjCk@|Fw@jI_AxJ{@tIs@~HQbBKdAWpCG|@MlBYlFg@fL[~GWfGg@nLEx@YvGI|BAh@A`@?\\A^@z@?T@X@X@TDl@Df@B\\Fh@Fp@F`@Ff@Hd@Ff@F`@RxA@F|BpPHf@`A|G@FLnAXhCFjABnABpBGrD?VAXG~AEz@CvACvAA\\?xABhAB|@BZDd@Fr@JdAFl@Hh@Jb@dAfFVnANbAHv@Ft@JzAD`A?H@p@?H?p@Av@GpACr@Gf@Eh@S`BKn@Kn@G^o@rDm@pDk@zCk@nDg@xCS`BKfAEn@E~AAhB@r@@b@DbAFp@BXFp@D\\F\\N`APv@XhANb@Nd@DH\\z@Zp@Zh@JNXh@Zb@h@p@\\d@^d@b@f@zBrCvAfBbAfAb@j@RV~BpCfBxB^f@n@v@|@dA`@h@n@t@RXnAxAnA~A`AlAZ`@\\b@pAzAn@z@R\\^j@b@|@`@x@L\\Tj@@BJ\\Tv@Tx@P|@TlA\\|Cf@vEd@dFDr@Bf@@\\@`CExBMpBMvAS`CaAfI}@~IGbACdA?BChA?|AD|BBn@@XJ`ADf@D\\N~@P~@ZxAZnADNd@tAvA~DbA|Cb@nAnBxFb@nAVz@HXn@jCb@|BR|ABVFp@VjCVrC@J\\|DJbAJjAX~Cd@nFL|AHvAHjBDfBBzBD~DDdDDrDBjBFfFH`HD`FHnGHvFBxBDfAHxBH|@BZX|BX`Bp@tClAzDlA~DfA`DxBbHp@hCR~@VpALfAHv@JpADn@BfA@t@@`BEzAANUvDM`BQdBSzBKjACTy@~I[jDStBK`AM~@Ip@Qz@Kj@ENSv@Wx@CFe@rAYn@g@hAg@v@yA`Cs@lAQ`@ELa@t@wEdHqDtF}BpDEHOXMTKT_@z@CFQ^Yz@Wz@g@tBUlAOz@iAtHGd@Mv@[jC[dCKpACj@?n@?^?B@j@?@DbAFn@R`Bb@lBn@vCF`@PdAFd@H`ABh@?N@f@?FCrDCxCCxBE|ECz@?dBAf@B|@@n@Fj@PfBd@xBbArFl@bD@DT`BNhAFn@@Z@\\@dAAn@GtAAFEZCRCNId@Mn@iAbFy@pDUdAMn@Kp@A@Eb@Gz@Ef@AbA@lALdBDn@NjCd@hFj@tHj@pG?@XjEBdA?pA?XA`@ARIz@OvAIf@Ij@e@hBwBdJmA|FKl@YdB]lB]lBy@pE]pBUzAMfA?@MzBIvDEfBCd@Cb@InAEd@Kl@Gb@I`@Mf@U`AeB|Es@bCa@zAa@bBoCrO_ApFu@hE]tBWxA_A`DoCdHq@nBeA~D?B_@nB[tBAHSrCSdE]`FIj@CRYlAi@bAMX}@lAA@}@`AYR_@LYLWDgAF{AG{Ew@}A[A?sACg@Du@RWFgDl@g@H[@}@BeAAkB@qCRiCTo@?{@EYGmA]UGm@Mg@Gi@C[AeA@uADiC\\[DIBi@N[P{@l@w@p@YT_B|Aq@r@e@n@KRKRy@nBq@`B{@lBa@r@A@a@b@mDxCk@r@s@hACHe@hAUv@M|@KhAEh@A`@AVJ|B\\nBT|@h@zArAlBbDvCdAnABH~@nB`@|BPlCBzAI|A_@vBa@jA]f@{AbCaBxBs@x@iB`BiAl@}Ah@cARa@Ji@RG@{Av@}@l@_BbAsCpBiAj@OH{Ax@WH_@JeCb@gAP{@TQF_@LqAr@}@l@sAx@c@VgHfFIH_Ax@aA|A[l@MZe@hBSnAOjAGfA?@MtD?LG|@ItAANK|BqBxi@O`E?H_@tNMjBKz@g@nEyAvJiAlHmAdI_DzSkAjHqAjGk@pC[|AkBzIAF_CnIs@zCGd@]vC[vDIlC@nBJpBLpBJn@XlBXdBf@hBLd@~@dCbGdJlBfCHNnAzB`@dAl@~BHXZrBRxE?jCCbGAb@?@A|BEtECvCAtGa@nV?REl@CbBOdDUjB[hBk@dBITYr@wAfCaBzC}@xAU^Wf@S`@]p@g@rAi@`BUz@Sv@S`AOz@Ij@UfBOhA_@nCY~Bc@jDY|B_@xC_@vCUhBKx@WtBC`@CTItAIjACl@GbBGlCCdBAp@AhA@f@B`A@T?FB`@Dt@Dj@Hp@L`AJp@FXLp@\\~A^jBVtA\\bBZ|AVjAfAtFXrAXzANr@\\bBZbBHl@D`@Hx@Dd@Dz@@l@?^?r@Cz@AdAGfAEfBAb@?f@@l@?^@d@Bd@?DBh@Fj@D\\Hn@DVZhBTxALv@ZdBNz@X`BJj@TpAZxBb@bCPhA\\nBRlAXfB@J@H@BA`@DNVn@Jn@\\vBHj@Hn@Ff@PhBNvBH|AD`ADlA@j@@j@@zA?~@?nA?pB@dC@xC?|C?fB@|A?fAFjA@^D^@JBLF\\@@BTH\\Ll@HTHTNb@Xl@P\\d@t@`BhCx@rA^j@nChEhAfBf@x@r@dAh@~@NT\\h@b@n@h@|@|@tAlAlBp@dAp@jANTn@bA^l@`@j@b@p@j@x@X\\h@h@`@Z|AhAv@h@`Al@LJf@`@XXr@x@^h@\\l@\\x@Z|@Nr@BFLx@J~@FtA?`CCh@Cl@MbAIf@Kf@Mf@M`@Yt@KR[l@m@~@{AtBwAnB{AtBy@bA[Z_@\\YRk@Z[N[Ja@Li@L_@FwARmCd@]Li@XWLi@`@YV_@`@a@f@OXS^Uf@ABIRSn@Qr@I\\I`@CTMlAC^Cj@?^AT?B@X?^Bh@Dr@Hx@^lE`@lELdBB|@D~@@bA?v@ErAEhBGn@InAQpAIj@QbAKb@U`As@jCW`Am@|Bo@~Bk@tBc@|Aa@zA]rAeCjJ_@tAkCxJENgAvDi@zAIP[t@O\\OV_@n@[f@_@j@_@d@Y^_@`@kCtCST_@`@ORY`@[d@U^_@n@S\\Yj@O\\Ul@O`@Yx@[~@]dAk@fBs@rBc@rAa@nAUn@a@pAe@vAc@nAm@dBWx@Od@Od@Uz@Qr@K`@ETQ`Ae@pCi@lDe@pCIf@_@|B]zBe@pCQfAWlAI\\]lAM\\ABSh@O`@Uh@Yh@Wb@Yb@QVY^_AbAYTWRe@\\w@d@uAn@oB~@sBfAk@b@YRa@`@UTa@d@ADS^{@~AGPSh@e@pAM^Qh@g@xBSdAKl@WpBMvAEtAAl@OtKKrDWvKEjBKvGG~CC~CBxDD|APpCB\\l@rHz@hLH|@^hCJd@Lp@XfAp@jBLXTf@Xj@x@nAb@j@vA`BnArA`OpOrEnGjBrDf@dAf@tAl@hBDJZhARr@bA|E^rBhCjOb@hCVzAHh@Hf@V|AVtA?BVxA`AzEZnATn@Nb@d@lAl@`Al@bAPXJLZb@b@`@`At@r@d@d@X`@RTJxD`BdBt@jAh@p@^|CbBf@f@@Bp@|@d@r@Tb@b@~@fApCz@bCzAfEz@vBfAzCJV`BrEbBxEhB`FxChIlBjFrC~HjEzLpBxFlAxC^x@b@|@Xh@Vd@j@~@bBzBzBjC~CnDbDrDv@dAh@x@x@zA^`AZx@XbAPr@Pz@^jC?@H|@HrBDnAFtEBhEBt@B`ALdB@LDb@D`@?D^bB`@dBFNj@hB|@tBnAtClC`GnB`EvA~C~AlDhAbCfAbCt@dBb@bAr@tB\\hAFPd@jBf@zBl@fD\\pBf@pC`@~B|@dFf@tCp@tDl@zBd@tA~@pBj@dAj@t@t@v@p@n@v@n@f@^xA|@n@`@ZPt@b@xBxAbBbA|E|CjDvBfC~A`An@n@b@l@f@fCvBlAdAbAx@nDdDxFzFjGfGjArAxAjBhAhBdB|CpBzDrBbElCfF|CdGjBhDx@jAx@~@r@p@x@n@~A~@fCdAh@TTHTHt@ZJD|Ap@hAd@@?~At@pBnA|@x@x@~@v@dA|@zAl@pAl@xA\\|@bAbCz@zBXx@dAnDh@dC`@~BVbCRjCHpCDhAF`BBv@HhC@h@@\\DlALrFhAxc@FlBL~D@l@ChDL|DLrDHtCDzA@^PdGPrGPxFRvGJpDDb@@VDXF`@Fd@VdBNt@Nl@FVj@jBv@nBXl@x@rAx@rAd@v@X`@x@xAd@~@Vj@JVr@jBPt@Pp@Ll@P`Af@vFHjBB\\h@tM\\|IZxH?LX|GTfEP`CVrBJt@DNT~@T~@b@rA`@fAl@rA\\l@d@z@x@rA@B`BhCLRz@tAVb@Vb@bBxCv@hBj@~Ah@dBDRjApFPvAPlALdABZBl@VdHXdHV|GVlHTlHVpGDpAR~GVnHb@pLPdGZrGRrIFfBJnCf@zNRzIJxDJ~CZlL\\jJz@tT~Av_@j@rFTjDb@|DN~@Fb@ZtA`AtDh@hBb@lAXx@`AtCxB~Fd@fA~@pCl@|AHP`@lArAbEz@lDh@`Cr@jEh@hDv@pGXlDBp@Bn@?`@?D?v@ArAEnAEx@CRATALCRG`@E^Kz@YtAI`@k@xC_DrPsCjOQ~@iDlQa@vBuAjHuB~K_BjIk@vCqBlKeBbKi@tEErACz@IlBAhEFxBHlAFfADj@FjAn@fENv@H\\d@nBz@bDd@dB`CzI^lA|@hDJ`@~@jDTt@bBtGj@|Bx@zCd@`B`@vAt@fC@BFTRn@Tz@@BDNHZDRJ^Lb@zAtFpB|GT~@l@zBDP|@fD`@pA`AxD\\nAbAnEFXNp@Jj@Hr@b@~ENzCB^D|AZrFNdCLnBHnAPbB?BHj@RvAZvAV|@f@vAx@rB|@jBb@`AjB~DnClGbFxKrAxCrFlLRb@vA~CFJv@nBRb@Td@rApC`BpDnDrHpCfGfHxOrH~OhAfC|EjK`BlDj@lAlB`E`IjQvIzQlExJtBnEjHzOrF|LdGfNvBzEpC`G|B|EfClFxAfD|AhDj@jAjAdCjBxDx@bBl@vAv@~A`AlBb@dAx@`BpBhE`D~GtEjKbGhMfCjGz@tBXn@d@dA?@x@hBd@bAnDtHDJ`ArCP\\fAfCrGfOvClG@@dBvD`HrM^bAdAzBnAhCv@jBpAxClC~GvAxClB`EpC|FpCvFdBzE`@rAh@jBn@~Cj@bDd@xDJdBJpBHhCB~FGrDIjB_@bEMbAm@bEw@vDy@~Ci@bBkCtHkDjKuEjNyBnG}CdJiEnMuD~KmAzDoEnMcDxJ_BvEiDdKsBjGoBxFoBbG{@dCaBbFoB|Fe@tAeEjMuDtK}DnLaE~Lk@bBgC|HcBdFi@~Ay@bCoCdI{BzGkC~HmDpK{BnGwC`JsCrI_B|ECFc@rA[~@yC|IUp@{@nCGVa@lAq@nBcA|CyDfL_B~Ey@dCw@`C_BzEeAbDqA|Dk@hBeA|Cg@zAu@xBqBhGgBtF{AhE{ArEkAlDkB`GuBfGk@fByAnEaB`FkBzFw@bCM\\[~@{AnEeCvHeCrHgDbK}DtLCDiApDcGvQiBtFcA|CO`@{AxEoBzFwBxGe@tA}AxEoCfIEJ{B|G}AxEgAfDwAjEy@zBcBnFoAvDa@`BOj@ABYtA_@|AIf@Ih@?DShBEb@ADGh@O|AIn@KtBG~AExDBjCLfLLxDF~H@h@J|EBhAJnADdC@jEFz@JdIBtCEh@AZ?nENlKNtHJzH@r@LnHJxFH~ABp@B~B@n@@n@?jA?HCbBCtAE|@CXKdAUdCOlA_A|Hg@|Da@fDc@lDSzA[pC_@vCe@lDq@xDOf@Mj@Qj@Wn@e@bAABq@lAU^KPaAnAMRA@iAlAuAxAm@p@e@f@}@~@eA~@oBjBiBhB{AtAeAbAuArAo@j@}@x@wAvA{AvAeA~@gBdBm@l@}A|AoCbCgAhAaB~A}BvBuBlBgAfAsCjCg@f@sBpBgC~B_CxBmAlA[VoBlBoBjBaB~AcB`BoAhAwArA}AzAcB~AeB`BkBhBqAlAqAnAeAbAg@j@}@bAe@l@[b@UVY`@S\\OTW`@_@p@q@rAcAzBmAtCm@rAcAbCkApCs@~AiAnCcA~BoDnIcA`Cy@lBaCtFoBrEk@pAsA|CoAzC_AxBQb@a@~@Uh@{@rBM\\]~@Yv@_@nAc@~Aa@`B_@rBe@xBe@xB]dBWpA_@jBk@lCs@pDYpAs@jDm@~Co@bDg@dCKd@]|AS`Aq@nDg@~Bw@pDq@jD}CtNEPkDdMkCvJwChKW|@uBzHeBdGoC|JyB|HmC|JiHnW}@dDkBvGc@zAeBnGaClIW|@yAjFuBtH{BjIeArDuA~EiAhEg@|BYbBUjBCf@I`AGzAC`B?dBFzAJjBPlBZnCt@vFpCjSnAxJf@vDnAtJxB~Pb@pDl@dFrBvOxAnLdB~MhA`JlAdJx@lGDXb@fCb@rBZpAV`Ab@tAdAhD`DhKDLfEtMbDbK`CvHj@hBtDjLvChJhAnDXjAZrAf@lCf@jDb@xDnBjRjAhM\\jCZrBZtA\\rAf@hBDNz@dCxAjDdFjLnJfTjGbN`BvDtB~E^z@lGvNhFjLzAhD|BfF@BxAdDN^hAnCx@dCb@|AZpAX|ANdANlA@JZpCTzD^lPh@~SLzERbId@zPL`FD`CTjJPbGx@n\\x@|[|@f]l@fV^rOTfH@`@NfDfAdOl@|Hz@pLXbGfCn[XvD|@xKPhCJzAB|@FlBH~FF~EDvD?dB?bCKvFOdH[pNG`DOvGcA|g@WzKK~DI`Dw@nMcAbQEr@WbEs@rM{@vNSxBQnBWdBMl@Ib@WnAg@vBu@|BcA`DqCdI_DbJmBxFK\\{B|Gi@pBc@xBObAUhB?HM~AEnAEjB@`FJ|H@hABhD@`ABrA@hAFzDBpCBpCHzFFbEHrGJ|GHpF@t@BpDJ~HFbFBtADjDDvDHrHDrEBvC@l@HbEBjAD`ABn@Dn@Hz@J|@PdAT`AZlAh@|A\\bAl@pAb@dALX^x@|@rBr@pAh@|@BDp@`Ah@n@f@l@ZXFFdA~@nBdB`BvA~AxAjAjAfAnAd@p@`@n@Vf@DF`@z@Xt@Pn@Nd@XhA`@rBZtBf@nCh@|CFXPr@d@bBx@pBf@|@DHf@r@^d@HJFHBD`@`@p@n@RTvA|@n@Xb@PLDp@Vj@Lx@Tt@LhC^ZFt@NnAXdBp@rAr@PLl@^lAbA~@~@r@|@j@|@Zf@JPXl@n@tATx@n@pBT~@BLHb@TpAHd@ZxBr@jE^dChAlHJv@Lr@Hp@RtAb@jCt@xEp@rE\\`CP`A\\|BTrAN`ALt@FZBRf@`CJ`@Tx@JVd@vAXl@Xl@d@v@LRf@t@v@|@zAdBf@f@|BdCjApA@@`@d@r@|@n@x@Xb@FJVh@\\t@\\~@v@~Bt@dCZnAd@~Al@tB|@~CHZb@zAhApD`AnDX`Az@rCBLNd@n@xB@DbAfD|@rCj@xAj@jADFR\\Zh@fBvCnBxCb@p@`AxAFHp@bAr@dALNl@~@r@bAh@x@`@n@n@hA`B`CdC~DvB`DPVv@fAjBvC`AtA\\d@r@hAh@~@LRvAxBV^pCfExA|BbBfCtDtFJNjAhB@BlBtCl@~@n@dAt@dAp@dAHJn@bATh@^p@hA`BjAnB~@|ANR`AxA~@|A~BhD|AfCbAxAn@x@b@b@RVjDxFz@tAXh@HNJRLX^z@FJTh@Vn@L^Rl@`@jAx@~Bd@zAtAjEb@nAl@vBDLzAlFj@hBh@hBp@tBt@zBl@dBFL`@bAr@xAVd@f@dAdAfB`AvA~AzB?@~AxBlAjBj@z@~@rAlBpCxB`DT^|AnBlAtA~@|@r@r@jA~@h@`@LJj@\\bAl@`Br@xDfBjCpAdChAnB|@~@d@f@TnB`AfAn@\\XZXb@`@v@|@PPd@l@f@t@\\n@Td@Xr@Z|@X|@VpALn@N~@Db@PjBFdABlA@hA?jAAVAj@Cd@Ef@Gt@Gd@Kl@SdAKf@YpAk@jCg@hCSzAUlBOxAO`CEz@?JEh@C~@?|AClBE|BEvCCpBKnH?DIbCEjBC|BGrFAlBGpDIlDE`BMrHAvCMvGEpBMlH?^EjDCz@Er@I~AQlAUxAWhAMj@]hAUl@g@hAm@hAe@t@QVQTo@v@q@l@i@b@YRm@\\mAl@wAb@mBh@mA\\]J}Bn@u@RsA^[Hy@VSHo@Ta@RWNk@\\YRMHa@\\IFIHONc@f@a@h@]d@c@t@W`@_@|@Yr@Qh@ABY|@Oh@Ml@QdAMt@Ip@Iz@GdAALCdA?|@?|@BlA@`@Bj@L~ARhCLbAFl@PfBPdBB^NzANhBd@fFPtBb@bFDn@JbAV~CV|CJrAFp@@f@DfA@lABxADdC@x@?bA@n@BfABfADtABZBVDh@Hx@Fb@Hf@FZF`@@F?FDNNr@J^HV\\bAVp@Vf@Vf@R\\Xf@\\f@X`@\\^RR`@`@VRXTZTZTn@^v@d@|@h@f@Z`@TZR\\Tn@b@VTFDZXRPZ\\Z^V^VZRZV`@b@z@LVRd@Tn@Pf@ZdAJd@Hd@Np@Ff@@JF\\Fr@@NBd@F~@@n@@`@@X?h@Ab@Ah@Az@AREl@I|@KfAG`@Q|@G\\Ol@ETUv@Qd@Od@Sf@]r@Wd@Yd@U\\a@h@MRSTa@^_@^[VYTs@f@m@Zu@\\[L]N[JUFs@NSDaAN{@Du@@[AQ?S?WCe@E]EEAUEg@Kw@Wg@Qw@_@_@SQK[UGESSq@k@m@q@q@}@e@q@]i@m@gAkAsBa@q@u@qAc@u@q@gAw@qAe@s@q@}@MMe@i@g@c@_@]]WA?i@]e@Yk@UWKi@QUIa@IWEq@I_@GUAA?W?_@Am@@c@B_@Bm@Fe@Hq@PYH[Jq@Xs@Z[LSJi@VC@y@^YL_@Pm@Xu@\\EB}@`@EB]N_@Ps@Zc@T}@`@}@b@g@Ts@^]Ri@\\u@l@]\\c@b@UXo@z@KNc@r@Sb@S`@[r@IT]dAOj@Qr@S`AMr@Mv@]jCWrBWfBa@~Ca@xCAHKp@i@xDEZ?DGZEVCXi@~DQnAQnAQnASzA[|BUdBMhAU|AQnAOnASzAM`AYlBUjBStAQhASpAUnAShAGVI`@Mp@Kh@A@Or@WzASx@WdAa@tAUn@Qb@Ul@c@|@c@v@]j@KNY`@yAtBc@l@IJwBzC[`@y@jAoAdBsC~DiBxCkApBuAlCQ\\KTUd@Ud@GPoAzCe@lAe@nAg@xAy@hCcCpIeAnDyHdXUr@I\\aAjDm@tBQp@}@dDWlAYpA[hB]rBq@lEGb@EXo@vFmB~Oc@vDqAdLe@`Es@xFOhA[nBUbAADQn@Md@EPa@lAgApCsHdPkElJkErJaAtBk@jAsCnG}AdEo@nBe@fBm@nCKp@c@xCWpBqBvQ]~Cs@zFy@bI?@sAdLYhCa@tD_BlNo@|FYjC[lCw@vGSxAEVQ|@GXMl@IZSr@[z@Ur@Wh@Sd@[l@i@`A_@h@]f@m@|@Y^qBpCe@l@y@jA[l@c@x@Yv@k@vA]hAUx@S|@UjAWdBOxAIvAEn@Ct@AvAAnB?vA?l@Cv@Cv@AX?P?DC\\Ej@?`A?fC@fGAzB?JM?gyNbqe@XT}@lCuA~DqE|MeBvEsAxCk@fA_@n@EF[`@g@j@iNlNwCrCyC~C]ZkBfBu@|@yAzAy@hAKPg@z@g@fAMX[t@_@pAMb@CJMl@Mv@Kx@Kr@G|@GhAEvB?PAX?~@B~@N|BJv@BLDXHn@R|@DPJ\\Lf@X|@Pb@DJbAvB\\l@f@t@\\`@FF\\`@r@r@dJtHtAjAn@n@f@j@p@`A|@xATh@JVTf@Xv@ZhAVjAPx@Nv@D`@TbCH~ALjCF|AVdFRtE@LZ`FTrDVtFPjDBb@p@`N`@pIb@xIb@rH@x@VxEJzAFfBN~BFdAPrCRtERhDPzCDnBVfGBrA?z@AdA?l@E`BOlBIx@M`AE^c@xBYtA{@`Ek@rCa@dB[fBMr@MpAMfBCn@AFCx@?fA@~DA`GAdDF|HCtI@jH?@?bGAnG@bHAzC?l@BjF?tJ?fE?lFAzAAhDEt@E|@Q~AE^UxAc@`BWbAEJkA`DoAzC{A~Du@jC]pBMdAANMtB?d@CVG^CFCH?HAT?VHrF\\pFR`D`@`H~@hJd@jCp@`E|A|FBF~@fCt@`BJVhCvDBDdBbBjD~Ah@JhAPnDNhELvKh@D?dEBzC@bB@xBV|Ap@d@TZP~@f@\\\\\\ZHFf@l@Z\\JLJLZf@DHnApCl@jBDRT|@p@`D|@jGXzBX~ADX^jBNz@h@~Av@~BfF~ORn@nE`NRn@Nl@r@hDNv@JbAHv@n@`JPhEJjBHdABT@F\\lDFd@F^Rx@VbAPl@Ph@bA`CNZHPdA|A|AzClA`CxB~GDRNx@Nt@ThCD|@FlAD`A@|@MvFGbBAVQhCUhEAhA?~@B~@PzEPtAJ|@h@~BNp@b@`Al@jAdApBnAxAl@j@hB~AVRzBlBLLzB|BpAlBBBfBvDh@~AVx@Lj@`@xBTtBHfAFfADfA@fCAr@?l@?DAhA?dA@TF|B@RF~@J~@n@pDT~@Pl@`@nARn@Vj@^hAVj@Vr@HRXl@vDfIHVHb@f@rCD\\\\zFBh@?t@?fAAf@Eh@KhAM|@OdASrAo@xBM`@u@~Bk@hBQ\\{@jA_AnAKLw@p@e@T{B^A@iBf@MDoALK@q@HcABW@gDEUEAAYIUIMMy@}@yB{AIIYUKKUWi@u@k@w@wAoBKQ{AcDq@}BISIc@_@}CAQYqFCe@E{@KaBKk@EYg@cAkAcCsAyBw@gAOSECsAaAEC[KQGGh@OpAIzAElB?N?x@?v@FpBBt@Bj@Ht@`BlMlAxJJv@XjEl@fJJnBRdCBPL`AL|@Hh@|@jFx@nGzB~QLhBD~ABn@FlDD|I@pE@lGC`H?tE@tC@dA@`@@\\HvD@PBpI?rEAPAbE@`B?h@@bA?~A?@AhCCdCGbCEtDCpBChA?~@QfGc@tP[nLIxBg@nR[`MOnGw@jUy@bVa@lMWdIIdCm@bRw@tUSfHIpCa@fNCr@o@`NQ~D_A|VG~CUtIg@xRGjBGfCo@|VGnBQrFWlIg@lQOlFs@bXA^E`BQjGApAAf@GpC?f@?fA?F?n@B\\APCzA?HCvA?FMzBEz@KtAAPGh@OlA]nBKf@EN]hAY~@[z@Un@a@x@EJ[n@a@n@e@t@[\\c@^WFu@lAuAhBGJm@r@]`@aAdAw@dAGRIXe@vAQz@CLMn@SnAMdAGdAE`@ChA?|A?h@?`@Bz@DhADr@LbBVbEDlAFrB?`A?f@ChAGjBKtACz@Ez@G~@Al@Ep@Cv@CdA?h@?x@?dABf@?\\Dj@Dj@Fn@Fh@Fj@N|@XxAZpBP`A\\rBJl@L`APvAJrADl@@@Bx@Bv@@v@?|@Ed@C|@Cl@Ch@Gz@El@Ix@Iz@I`AGt@K`AGp@Iz@Gf@Or@Kd@Mj@K^I\\Sn@Sh@Qb@Wj@Wj@]l@Yd@[`@k@r@[Z]Z_@Z[Ta@X]Rg@TqAh@}@Xs@Pq@Pi@Ni@Ni@Pw@Zk@XC@c@ROHOJg@\\mAdAwAnAiAhAiAfAc@^k@b@s@b@u@`@_A^G@k@P{@Nm@Jm@Dg@@w@B_A?iAE}@CkAEkAC}@AaACm@@iAFA?}@JgAViAh@g@Ty@\\c@Z]Vs@n@m@r@MNW\\m@|@Yd@Ud@Wn@Yn@_@nACLUx@[zAKp@AJMz@Kt@OdAIp@CVM~@QjACVEVOhAYvAm@jCa@vA[`AWl@Yx@e@dAc@|@_@|@e@fAm@tAq@xAu@fBm@tA_@x@Yx@Wp@W|@CFMd@UbAKj@On@Il@Kx@QbBKvAKdAMtBGbAEz@Iz@I`ACJI`AQlAO~@[bBQ|@U`A[`A_@nA]dAa@jAe@nAo@dBk@zACJe@pAa@jAy@zBm@|A{@bCq@dBm@fBc@rAc@dBSx@U`AQ~@?BUjBm@lGgBxPU~Be@fFa@hFAjACvCAlDFvCDtBH~Ap@pG^bCBJR|@XrAXlAT~@XhAXlAl@dCl@hCf@pBb@pBPlALv@Lz@V|FBjDBjCBhHRfLDdGFdKZrOFlF@LNvB~AbHDPtDrNpClKrBjIfBnDN\\zAzApCrC|@|@bFxFlBrCFPr@pBrAbFjCbM^dBhDfNp@~At@|@HHj@p@xD|BbCbA|F~BvFdBnC|@rEjBdC|Ad@b@lAlApAdBnAjCn@rBr@zCDPr@fDHzBGbCARG~AIjAGl@ABW~AKh@Ml@_@dBK\\c@tA]vAs@jC]~AS`AQhAM~@GbAKzACzA?tC@zA@lDBtC@pD@x@?PBhEDvC@fF?b@@~ABnA@vB?jB@`B@tDHpCHfCJxBPjBP`BRbBFXNz@\\fBXpA^|Ab@vAlAxDr@|B`AzCTz@j@lBd@pBP`ARnAJ|@HdAFjA?RDdCGhAIbBUpBaAxEEXGb@QnBYrBi@fD}A~Ja@jCMz@Mz@c@nC_@bD[pBWrAWtAUfBWvAUt@a@dCoAbIKt@QlAQnB?DCh@El@C`@CxA?T?~@@`@Bv@r@vML`CJzBDnBCzACpAElAEt@It@It@Ir@W`B_@~Ag@nBc@vAg@`Ao@xAy@xAyAxBoAfBSZyBdD}@rAKPqBxCqDrFyBbDwAxBcA`Bi@jAg@lAUv@Yz@YlAMt@ERMbAIv@KfAG|AE~AAxA@vCDxL?`B@p@AjBAbAAp@AbE?pBD|FXbFVtB?D`@tBbAzDNj@`AzDxClJvCfKz@`Dn@a@tlKnh_CRF?D}AhLClAy@jGCr@In@a@tC[~By@pG_E|Zy@fG]lCc@`DEVIn@?B]fC]lC}B~P_AdHCPgDdWAL{Et^CRCRoFla@OjACTcHzh@G\\{B`QkAhJm@xEM~@g@zDCPCRs@jFM`Aq@~EmA|IKh@Id@eAvFq@fDmAzFADi@tBSx@e@bBa@tAw@~B_AjCi@zA_AtBcA~BwB~D_G|Jo@~AKPWb@kArB_C~DaPbXaC~DOVyAbCaC`E_EzGuEzHmJ~OsItNqAxB_BjCwLbSyFxJgEnHYr@e@z@Yb@OVMRMTgAhBKRiAhBgFpIoDdGgCfE{BzD_E|GiFtIsC|EKR_AbBg@~@k@bAg@z@c@z@iAbCa@|@Wt@K\\ERQ|@a@nBkCfMa@nAMh@?DYxBSzAOhAQvAq@pFGh@y@vGYzBi@`E{@~GQrAoAdKADCRGf@K|@M~@G^aBvMYrB_@lBm@`Cg@|Aw@pB{@~Au@tAq@pAiArBMf@Uz@]z@eBzCINo@dAwHvM[h@iDfGOVo@hAm@hAo@hAm@hAU`@CB{DjHU`@EHqA`CKVcAxBuBxFaAnCm@~Am@zAOd@]xAq@fCCHg@jBCHMn@Mx@S`AKp@Ox@[zAGh@k@fCyCdLTL"), [])

    useEffect(() => {
        const routesRaw = localStorage.getItem("routes")

        if (routesRaw != null)
            setRoutes(JSON.parse(routesRaw))
        else
            fetch_buses_coords().then(resp => {
                localStorage.setItem('routes', JSON.stringify(resp))
                setRoutes(resp)
            })
    }, []);

    // <Polyline pathOptions={{color: "red"}} positions={examplePoly} />
    return (
        <>
            {
                routes.map((route, i) => (
                    <MovingMarker key={i} icon={getBusIcon(route)} polyline={route.polyline} speed={5}/>
                ))
            }
        </>
    )
}