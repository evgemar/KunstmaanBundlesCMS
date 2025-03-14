<?php

namespace Kunstmaan\SitemapBundle\Controller;

use Kunstmaan\AdminBundle\Helper\Security\Acl\Permission\PermissionMap;
use Kunstmaan\NodeBundle\Helper\NodeMenu;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class SitemapController extends Controller
{
    /**
     * This will generate a sitemap for the specified locale.
     * Use the mode parameter to select in which mode the sitemap should be generated.
     * At this moment only XML is supported
     *
     * @Route("/sitemap-{locale}.{_format}", name="KunstmaanSitemapBundle_sitemap", requirements={"_format" = "xml"})
     * @Template("KunstmaanSitemapBundle:Sitemap:view.xml.twig")
     *
     * @param $locale
     * @return array
     */
    public function sitemapAction($locale)
    {
        $em = $this->getDoctrine()->getManager();
        $securityContext = $this->get('security.context');
        $aclHelper = $this->get('kunstmaan_admin.acl.helper');
        $nodeMenu = new NodeMenu($em, $securityContext, $aclHelper, $locale, null, PermissionMap::PERMISSION_VIEW, false, false);

        return  $this->render('KunstmaanSitemapBundle:Sitemap:view.xml.twig', array(
            'nodemenu' => $nodeMenu,
        ));
    }

    /**
     * This will generate a sitemap index file to define a sub sitemap for each language.
     * Info at: https://support.google.com/webmasters/answer/75712?rd=1
     * Use the mode parameter to select in which mode the sitemap should be generated.
     * At this moment only XML is supported
     *
     * @Route("/sitemap.{_format}", name="KunstmaanSitemapBundle_sitemapindex", requirements={"_format" = "xml"})
     * @Template("KunstmaanSitemapBundle:SitemapIndex:view.xml.twig")
     *
     * @param Request $request
     * @return array
     */
    public function sitemapIndexAction(Request $request)
    {
        $requiredLocales = $this->container->getParameter('requiredlocales');
        $locales = explode("|", $requiredLocales);

        return  $this->render('KunstmaanSitemapBundle:SitemapIndex:view.xml.twig', array(
            'locales' => $locales,
            'host' => $request->getSchemeAndHttpHost()
        ));
    }

}
