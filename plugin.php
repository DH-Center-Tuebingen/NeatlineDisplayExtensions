<?php
	/*
		Copyright 2015 eScience-Center, University of Tübingen
		Authors: Michael Derntl <michael.derntl@uni-tuebingen.de>
		License: WTFPL Version 2 (http://www.wtfpl.net/txt/copying/)
	*/
		
	class NeatlineDisplayExtensionsPlugin extends Omeka_Plugin_AbstractPlugin
	{
		protected $_hooks = array(
			'neatline_public_static',
			'neatline_editor_static'
		);
		
		public function hookNeatlinePublicStatic($args)	{
			$this->queueThemFilthyAssets();			
		}
		
		public function hookNeatlineEditorStatic($args)	{
			$this->queueThemFilthyAssets();
		}
		
		protected function queueThemFilthyAssets() {
			queue_js_file('esc-neatline-ext');
			queue_js_file('esc-jquery.fancybox.pack');
			
			queue_css_file('esc-neatline-ext');
			queue_css_file('esc-jquery.fancybox');
		}
	};
	
	$NeatlineDisplayExtensionsPlugin = new NeatlineDisplayExtensionsPlugin();
	$NeatlineDisplayExtensionsPlugin->setUp();
?>